import { site } from "@/lib/site";

/**
 * Enquiry endpoint for both the full quote form and the short RFQ.
 *
 * Delivery goes through Resend's HTTP API — no SMTP library, no extra
 * dependency, works on the edge and on Vercel's Node runtime alike. Set
 * `RESEND_API_KEY` and `ENQUIRY_FROM` (a domain you have verified with Resend)
 * to turn it on; `ENQUIRY_TO` overrides the destination, which otherwise
 * defaults to the address published on the site.
 *
 * Until those are set the route answers 503 with `configured: false`. That is
 * deliberate and the client depends on it: a false 200 would swallow real
 * enquiries, so the form treats this exact response as "fall back to mailto"
 * rather than as an error to show the visitor. The mailto path is worse, but
 * it is the behaviour the site has today, so nothing regresses while the
 * credentials are outstanding.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Kind = "quote" | "quick";

const REQUIRED: Record<Kind, string[]> = {
  quote: [
    "company",
    "firstName",
    "lastName",
    "email",
    "address1",
    "city",
    "state",
    "zip",
    "country",
    "model",
    "message",
  ],
  quick: ["email", "company", "message"],
};

const LABELS: Record<string, string> = {
  company: "Company",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  address1: "Address line 1",
  address2: "Address line 2",
  city: "City",
  state: "State / region",
  zip: "ZIP / postal code",
  country: "Country",
  model: "PROMATION model number",
  message: "Information needed",
  newsletter: "Newsletter opt-in",
  page: "Submitted from",
};

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"
  );
}

export async function POST(request: Request) {
  let payload: { kind?: string; fields?: Record<string, unknown> };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const kind: Kind = payload.kind === "quick" ? "quick" : "quote";
  const raw = payload.fields ?? {};
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string") fields[k] = v.trim();
    else if (typeof v === "boolean") fields[k] = v ? "yes" : "no";
  }

  // Honeypot. Real people never fill a field they cannot see, so accept the
  // submission and drop it — telling a bot it failed only teaches it to retry.
  if (fields.website) return Response.json({ ok: true });

  const missing = REQUIRED[kind].filter((f) => !fields[f]);
  if (missing.length > 0) {
    return Response.json(
      { ok: false, error: "Missing required fields", missing },
      { status: 422 }
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) {
    return Response.json(
      { ok: false, error: "Invalid email address", missing: ["email"] },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  const to = process.env.ENQUIRY_TO ?? site.email;

  if (!apiKey || !from) {
    return Response.json(
      { ok: false, configured: false, error: "Mail delivery is not configured" },
      { status: 503 }
    );
  }

  const order = [...REQUIRED[kind], "phone", "address2", "newsletter", "page"];
  const seen = new Set<string>();
  const rows = order
    .filter((k) => !seen.has(k) && (seen.add(k), fields[k]))
    .map(
      (k) =>
        `<tr><td style="padding:4px 14px 4px 0;vertical-align:top;color:#64748b;white-space:nowrap">${esc(
          LABELS[k] ?? k
        )}</td><td style="padding:4px 0;vertical-align:top;color:#0f172a">${esc(
          fields[k]
        ).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const heading =
    kind === "quick"
      ? `Quick RFQ — ${fields.company}`
      : `Website enquiry — ${fields.company}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: heading,
        html: `<h2 style="font:600 18px system-ui;color:#0f172a">${esc(
          heading
        )}</h2><table style="font:14px system-ui;border-collapse:collapse">${rows}</table>`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend rejected the enquiry:", res.status, detail);
      return Response.json(
        { ok: false, error: "Delivery failed" },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Enquiry delivery threw:", err);
    return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
