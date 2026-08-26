"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * A faithful rebuild of the enquiry form on the live site. Same fields, same
 * required flags:
 *
 *   Company Name*, Contact Name (first/last)*, Email Address*, Phone Number,
 *   Company Address (line 1*, line 2, city*, state*, zip*, country*),
 *   PROMATION Model Number*, description*, newsletter opt-in.
 *
 * Submission currently composes a formatted email so nothing is lost before a
 * server endpoint exists — see `onSubmit`.
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
  "w-full border border-line bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-muted/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

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
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    // Until a server endpoint is wired up, hand the enquiry to the user's mail
    // client fully formatted — no field is dropped.
    const body = [
      `Company:        ${get("company")}`,
      `Contact:        ${get("firstName")} ${get("lastName")}`,
      `Email:          ${get("email")}`,
      `Phone:          ${get("phone") || "—"}`,
      "",
      "Company address:",
      `  ${get("address1")}`,
      get("address2") ? `  ${get("address2")}` : null,
      `  ${get("city")}, ${get("state")} ${get("zip")}`,
      `  ${get("country")}`,
      "",
      `PROMATION model number: ${get("model")}`,
      `Newsletter opt-in:      ${data.get("newsletter") ? "yes" : "no"}`,
      "",
      "Information needed:",
      get("message"),
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Website enquiry — ${get("company")}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="glass clip-corner p-7 sm:p-9">
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
            className="mt-0.5 h-4 w-4 border-line accent-blue-600"
          />
          Sign me up for the PROMATION USA newsletter.
        </label>
      </fieldset>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="clip-corner bg-blue-600 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-blue-500"
        >
          Send enquiry
        </button>
        <a
          href={`tel:+1${site.phone.replace(/\D/g, "")}`}
          className="font-mono text-xs uppercase tracking-[0.18em] text-slate-900 underline-offset-4 hover:text-blue-600 hover:underline"
        >
          Or call {site.phone}
        </a>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {sent
          ? "Your email client should have opened with the enquiry ready to send."
          : "Fields marked * are required."}
      </p>
    </form>
  );
}
