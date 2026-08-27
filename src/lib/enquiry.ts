/**
 * Client half of the enquiry pipeline, shared by the long form and the short
 * RFQ so they cannot drift apart in how they handle failure.
 *
 * `status` is what the caller acts on:
 *   "sent"       — delivered, show the thank-you
 *   "fallback"   — no mail credentials on the server yet; hand off to mailto
 *   "invalid"    — server-side validation rejected it, `missing` names fields
 *   "error"      — delivery was attempted and failed; the visitor must retry
 */

export type EnquiryResult =
  | { status: "sent" }
  | { status: "fallback" }
  | { status: "invalid"; missing: string[] }
  | { status: "error" };

export async function submitEnquiry(
  kind: "quote" | "quick",
  fields: Record<string, string>
): Promise<EnquiryResult> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, fields }),
    });

    if (res.ok) return { status: "sent" };

    // 503 is the server saying it has no credentials — not a failure the
    // visitor caused, and not one they should see. Fall back silently.
    if (res.status === 503) return { status: "fallback" };

    if (res.status === 422) {
      const body = await res.json().catch(() => ({}));
      return { status: "invalid", missing: body.missing ?? [] };
    }

    return { status: "error" };
  } catch {
    // Offline, blocked, or the route is missing entirely. The mailto path at
    // least keeps the enquiry recoverable.
    return { status: "fallback" };
  }
}

/** Build the mailto used whenever delivery is unavailable. */
export function enquiryMailto(
  to: string,
  subject: string,
  lines: (string | null)[]
): string {
  return `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(lines.filter((l) => l !== null).join("\n"))}`;
}
