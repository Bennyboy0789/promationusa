"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { submitEnquiry, enquiryMailto } from "@/lib/enquiry";

/**
 * The short path to a conversation — three fields.
 *
 * It exists alongside the full enquiry form rather than replacing it. The long
 * form asks for a full postal address and a PROMATION model number before the
 * visitor may say what they need, which assumes they already know which
 * machine they want. Anyone still choosing a supplier does not, and that is
 * most of the traffic. This catches them; the long form still serves the
 * people who are ready for it.
 */
export function QuickRfq({
  heading = "Not sure where to start?",
  blurb = "Tell us what you're trying to automate. An applications engineer replies within one business day.",
  compact = false,
  source,
}: {
  heading?: string;
  blurb?: string;
  /** Tighter spacing for sidebars. */
  compact?: boolean;
  /** Where the form was submitted from, recorded on the enquiry. */
  source?: string;
}) {
  const [state, setState] = useState<
    "idle" | "sending" | "sent" | "error" | "invalid"
  >("idle");
  const started = useRef(false);

  function onFirstInput() {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: "quick_rfq", location: source });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields: Record<string, string> = {
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
      page: source ?? (typeof window !== "undefined" ? window.location.pathname : ""),
    };

    setState("sending");
    const result = await submitEnquiry("quick", fields);

    if (result.status === "sent") {
      track("quick_rfq_submit", { location: fields.page });
      form.reset();
      setState("sent");
      return;
    }

    if (result.status === "invalid") {
      setState("invalid");
      return;
    }

    if (result.status === "fallback") {
      track("quick_rfq_submit", { location: fields.page, transport: "mailto" });
      window.location.href = enquiryMailto(
        site.email,
        `Quick RFQ — ${fields.company}`,
        [
          `Company: ${fields.company}`,
          `Email:   ${fields.email}`,
          "",
          "What we're trying to automate:",
          fields.message,
        ]
      );
      setState("sent");
      return;
    }

    setState("error");
  }

  const input =
    "w-full border border-line bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-muted/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
  const label =
    "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted";

  if (state === "sent") {
    return (
      <div
        className={`glass clip-corner ${compact ? "p-6" : "p-7 sm:p-8"}`}
        role="status"
      >
        <h2 className="font-display text-lg font-bold text-slate-900">
          Thanks — that&apos;s with us.
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          An applications engineer will come back to you, usually within one
          business day. If it&apos;s urgent, call{" "}
          <a
            href={`tel:+1${site.phone.replace(/\D/g, "")}`}
            className="text-blue-600 underline-offset-4 hover:underline"
          >
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onInput={onFirstInput}
      className={`glass clip-corner ${compact ? "p-6" : "p-7 sm:p-8"} ${
        compact ? "" : "w-full lg:w-[26rem]"
      }`}
    >
      <h2
        className={`font-display font-bold text-slate-900 ${
          compact ? "text-base" : "text-xl"
        }`}
      >
        {heading}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>

      <div className={compact ? "mt-5 space-y-3.5" : "mt-6 space-y-4"}>
        <div>
          <label htmlFor={`qr-email-${source ?? "x"}`} className={label}>
            Work email <span className="text-blue-600">*</span>
          </label>
          <input
            id={`qr-email-${source ?? "x"}`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={input}
          />
        </div>
        <div>
          <label htmlFor={`qr-company-${source ?? "x"}`} className={label}>
            Company <span className="text-blue-600">*</span>
          </label>
          <input
            id={`qr-company-${source ?? "x"}`}
            name="company"
            type="text"
            required
            autoComplete="organization"
            className={input}
          />
        </div>
        <div>
          <label htmlFor={`qr-message-${source ?? "x"}`} className={label}>
            What are you trying to automate?{" "}
            <span className="text-blue-600">*</span>
          </label>
          <textarea
            id={`qr-message-${source ?? "x"}`}
            name="message"
            required
            rows={compact ? 3 : 4}
            placeholder="e.g. through-hole soldering on a 6-joint board, about 400 units a week"
            className={input}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`qr-website-${source ?? "x"}`}>Website</label>
        <input
          id={`qr-website-${source ?? "x"}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        data-cta="quick-rfq-submit"
        disabled={state === "sending"}
        className="clip-corner mt-6 w-full bg-blue-600 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send it over"}
      </button>

      <p aria-live="polite" className="mt-3 text-xs leading-relaxed text-muted">
        {state === "error"
          ? "That didn't send. Please try again, or call " + site.phone + "."
          : state === "invalid"
            ? "Please check the fields above and try again."
            : "No obligation. We don't share your details."}
      </p>
    </form>
  );
}
