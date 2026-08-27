"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { submitEnquiry, enquiryMailto } from "@/lib/enquiry";

/**
 * A faithful rebuild of the enquiry form on the live site. Same fields, same
 * required flags:
 *
 *   Company Name*, Contact Name (first/last)*, Email Address*, Phone Number,
 *   Company Address (line 1*, line 2, city*, state*, zip*, country*),
 *   PROMATION Model Number*, description*, newsletter opt-in.
 *
 * Submission posts to `/api/enquiry`. If that route has no mail credentials
 * yet it answers 503, and we drop back to the composed mailto this form used
 * before — so the enquiry is never lost, and the day the credentials land the
 * form starts delivering properly with no further change here.
 *
 * `form_start` and `form_abandon` are tracked because for a form this long the
 * abandonment rate is the number worth knowing. It is the evidence for or
 * against the short RFQ that now sits beside it.
 */

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  span?: "full" | "half";
};

const IDENTITY: Field[] = [
  { name: "company", label: "Company name", required: true, autoComplete: "organization", span: "full" },
  { name: "firstName", label: "First name", required: true, autoComplete: "given-name" },
  { name: "lastName", label: "Last name", required: true, autoComplete: "family-name" },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
];

const ADDRESS: Field[] = [
  { name: "address1", label: "Address line 1", required: true, autoComplete: "address-line1", span: "full" },
  { name: "address2", label: "Address line 2", autoComplete: "address-line2", span: "full" },
  { name: "city", label: "City", required: true, autoComplete: "address-level2" },
  { name: "state", label: "State / region", required: true, autoComplete: "address-level1" },
  { name: "zip", label: "ZIP / postal code", required: true, autoComplete: "postal-code" },
  { name: "country", label: "Country", required: true, autoComplete: "country-name" },
];

const inputCls =
  "w-full border border-line bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-muted focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

function TextField({ field }: { field: Field }) {
  const id = `cf-${field.name}`;
  return (
    <div className={field.span === "full" ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
      >
        {field.label}
        {field.required && <span className="ml-1 text-blue-600">*</span>}
      </label>
      <input
        id={id}
        name={field.name}
        type={field.type ?? "text"}
        required={field.required}
        autoComplete={field.autoComplete}
        className={inputCls}
      />
    </div>
  );
}

export function ContactForm() {
  const [state, setState] = useState<
    "idle" | "sending" | "sent" | "error" | "invalid"
  >("idle");
  const started = useRef(false);
  const finished = useRef(false);

  useEffect(() => {
    function onLeave() {
      if (started.current && !finished.current) {
        track("form_abandon", { form: "contact_full" });
      }
    }
    // `pagehide` fires where `beforeunload` is unreliable — notably iOS Safari.
    window.addEventListener("pagehide", onLeave);
    return () => {
      window.removeEventListener("pagehide", onLeave);
      onLeave();
    };
  }, []);

  function onFirstInput() {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: "contact_full" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const fields: Record<string, string> = {
      company: get("company"),
      firstName: get("firstName"),
      lastName: get("lastName"),
      email: get("email"),
      phone: get("phone"),
      address1: get("address1"),
      address2: get("address2"),
      city: get("city"),
      state: get("state"),
      zip: get("zip"),
      country: get("country"),
      model: get("model"),
      message: get("message"),
      newsletter: data.get("newsletter") ? "yes" : "no",
      website: get("website"),
    };

    setState("sending");
    const result = await submitEnquiry("quote", fields);

    if (result.status === "sent") {
      finished.current = true;
      track("quote_submit", { location: "/contact" });
      form.reset();
      setState("sent");
      return;
    }

    if (result.status === "invalid") {
      setState("invalid");
      return;
    }

    if (result.status === "fallback") {
      // No server-side delivery yet — hand the enquiry to the mail client
      // fully formatted, exactly as this form did before the endpoint existed.
      finished.current = true;
      track("quote_submit", { location: "/contact", transport: "mailto" });
      window.location.href = enquiryMailto(
        site.email,
        `Website enquiry — ${fields.company}`,
        [
          `Company:        ${fields.company}`,
          `Contact:        ${fields.firstName} ${fields.lastName}`,
          `Email:          ${fields.email}`,
          `Phone:          ${fields.phone || "—"}`,
          "",
          "Company address:",
          `  ${fields.address1}`,
          fields.address2 ? `  ${fields.address2}` : null,
          `  ${fields.city}, ${fields.state} ${fields.zip}`,
          `  ${fields.country}`,
          "",
          `PROMATION model number: ${fields.model}`,
          `Newsletter opt-in:      ${fields.newsletter}`,
          "",
          "Information needed:",
          fields.message,
        ]
      );
      setState("sent");
      return;
    }

    setState("error");
  }

  if (state === "sent") {
    return (
      <div className="glass clip-corner p-7 sm:p-9" role="status">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Thanks — that&apos;s with us.
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
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
    <form onSubmit={onSubmit} onInput={onFirstInput} className="glass clip-corner p-7 sm:p-9">
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 font-display text-xl font-bold text-slate-900">
          Your details
        </legend>
        {IDENTITY.map((f) => (
          <TextField key={f.name} field={f} />
        ))}
      </fieldset>

      <fieldset className="mt-9 grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 font-display text-xl font-bold text-slate-900">
          Company address
        </legend>
        {ADDRESS.map((f) => (
          <TextField key={f.name} field={f} />
        ))}
      </fieldset>

      <fieldset className="mt-9 grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 font-display text-xl font-bold text-slate-900">
          How can we help?
        </legend>
        <TextField
          field={{
            name: "model",
            label: "PROMATION model number",
            required: true,
            autoComplete: "off",
            span: "full",
          }}
        />
        <div className="sm:col-span-2">
          <label
            htmlFor="cf-message"
            className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Please describe the information needed
            <span className="ml-1 text-blue-600">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            className={inputCls}
          />
        </div>
        <label className="flex items-start gap-3 text-sm text-muted sm:col-span-2">
          <input
            type="checkbox"
            name="newsletter"
            className="mt-0.5 h-6 w-6 shrink-0 border-line accent-blue-600"
          />
          Sign me up for the PROMATION USA newsletter.
        </label>
      </fieldset>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          data-cta="contact-full-submit"
          disabled={state === "sending"}
          className="clip-corner bg-blue-600 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <a
          href={`tel:+1${site.phone.replace(/\D/g, "")}`}
          className="inline-flex min-h-[24px] items-center py-1 font-mono text-xs uppercase tracking-[0.18em] text-slate-900 underline-offset-4 hover:text-blue-600 hover:underline"
        >
          Or call {site.phone}
        </a>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {state === "error"
          ? `That didn't send. Please try again, or call ${site.phone}.`
          : state === "invalid"
            ? "Please check the required fields and try again."
            : "Fields marked * are required."}
      </p>
    </form>
  );
}
