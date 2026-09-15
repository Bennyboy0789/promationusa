"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { submitEnquiry, enquiryMailto } from "@/lib/enquiry";
import {
  WorkTablePreview3D,
  LENGTH_M,
  DEPTH_M,
  type WorkTablePreviewHandle,
  type ViewName,
} from "./WorkTablePreview3D";

/**
 * Configure-to-order work table / inspection station.
 *
 * The page *is* the environment: the rendered showroom bay fills the viewport
 * and the controls float over it as dark glass panels, so configuring the
 * machine feels like standing in the room with it. On desktop the scene runs
 * full-bleed behind everything; on small screens it takes the top of the page
 * and the panels stack beneath it.
 *
 * The option set comes from Mike's own list on the review call, and the belt
 * types are the ones he rattled off for PCB handling. Dimensions are labelled
 * as typical rather than published spec — every real order is confirmed by
 * engineering, and the page says so rather than pretending the catalogue is
 * fixed.
 *
 * The build lives in the URL (`?c=…`) so a buyer can send it to whoever signs
 * off. Submission goes through the same /api/enquiry route as the quote form,
 * carrying a JPEG of the frame the visitor was looking at, and falls back to
 * mailto only when the server has no mail credentials yet.
 */

const CONVEYANCE = [
  { key: "esd-flat", label: "3mm ESD edge belt", code: "E", note: "The default for populated boards — static-safe edge contact, nothing touches the underside." },
  { key: "o6b-chain", label: "O6B roller chain", code: "C", note: "Heavier assemblies and pallets. Roller contact carries weight a belt would not." },
  { key: "pin-chain", label: "Pin chain", code: "P", note: "Edge-only contact through thermal processes, where a belt would mark the board." },
  { key: "timing-belt", label: "Timing belt", code: "T", note: "Positioning accuracy under a head — the board stops where it is told to." },
  { key: "round-belt", label: "Thin round belt", code: "R", note: "Light boards, minimal contact area." },
] as const;

const WIDTHS = [
  { key: "250", label: "Up to 250 mm boards", code: "250" },
  { key: "330", label: "Up to 330 mm boards", code: "330" },
  { key: "460", label: "Up to 460 mm boards", code: "460" },
  { key: "custom-w", label: "Wider / custom", code: "CW" },
] as const;

const LENGTHS = [
  { key: "1000", label: "1.0 m station", code: "1000" },
  { key: "1500", label: "1.5 m station", code: "1500" },
  { key: "2000", label: "2.0 m station", code: "2000" },
  { key: "custom-l", label: "Longer / custom", code: "CL" },
] as const;

const TRAYS = [
  { key: "none", label: "No trays" },
  { key: "single", label: "Single rear row" },
  { key: "double", label: "Double rear row" },
] as const;

const VIEWS: { key: ViewName; label: string }[] = [
  { key: "three-quarter", label: "3/4" },
  { key: "front", label: "Front" },
  { key: "top", label: "Top" },
  { key: "operator", label: "Operator" },
];

export type Config = {
  conveyance: (typeof CONVEYANCE)[number]["key"];
  width: (typeof WIDTHS)[number]["key"];
  length: (typeof LENGTHS)[number]["key"];
  light: boolean;
  trays: (typeof TRAYS)[number]["key"];
  swingArm: boolean;
};

const DEFAULTS: Config = {
  conveyance: "esd-flat",
  width: "330",
  length: "1500",
  light: true,
  trays: "single",
  swingArm: false,
};

function find<T extends { key: string }>(list: readonly T[], key: string): T | undefined {
  return list.find((o) => o.key === key);
}

// ---- the build as a string: URL, reference code, spec -----------------------

function encodeConfig(c: Config): string {
  return [c.conveyance, c.width, c.length, c.light ? 1 : 0, c.trays, c.swingArm ? 1 : 0].join(".");
}

function decodeConfig(s: string | null): Config | null {
  if (!s) return null;
  const [conveyance, width, length, light, trays, swingArm] = s.split(".");
  if (!find(CONVEYANCE, conveyance) || !find(WIDTHS, width) || !find(LENGTHS, length) || !find(TRAYS, trays)) return null;
  return {
    conveyance: conveyance as Config["conveyance"],
    width: width as Config["width"],
    length: length as Config["length"],
    light: light === "1",
    trays: trays as Config["trays"],
    swingArm: swingArm === "1",
  };
}

/** Indicative reference, e.g. WT-1500-330-E-LT1. Engineering assigns the real one. */
function referenceCode(c: Config): string {
  const opts = [c.light ? "L" : "", c.trays === "single" ? "T1" : c.trays === "double" ? "T2" : "", c.swingArm ? "S" : ""].join("");
  const base = `WT-${find(LENGTHS, c.length)!.code}-${find(WIDTHS, c.width)!.code}-${find(CONVEYANCE, c.conveyance)!.code}`;
  return opts ? `${base}-${opts}` : base;
}

/** Same numbers the 3D model is built from, so the sheet cannot drift from the render. */
function dimensions(c: Config) {
  const L = LENGTH_M[c.length];
  const D = DEPTH_M[c.width];
  const rows = c.trays === "double" ? 2 : c.trays === "single" ? 1 : 0;
  const overall = c.light ? 1.86 : rows ? 1.48 + (rows - 1) * 0.32 : 1.01;
  return {
    length: Math.round(L * 1000),
    depth: Math.round((D + 0.2) * 1000),
    belt: Math.round(D * 1000),
    worktop: 920,
    overall: Math.round(overall * 1000),
  };
}

export function WorkTableConfigurator() {
  const [config, setConfig] = useState<Config>(DEFAULTS);
  const [form, setForm] = useState({ email: "", company: "", name: "", message: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "invalid" | "error">("idle");
  const [sentVia, setSentVia] = useState<"api" | "mailto">("api");
  const previewRef = useRef<WorkTablePreviewHandle>(null);
  const started = useRef(false);

  const set = <K extends keyof Config>(k: K, v: Config[K]) => setConfig((c) => ({ ...c, [k]: v }));
  const setField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!started.current) {
      started.current = true;
      track("form_start", { form: "configurator" });
    }
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  // Build ⇄ URL. Read once on mount; mirror back only once the state has
  // moved off the untouched DEFAULTS object, without adding history entries —
  // back should leave the page, not undo a chip. Writing the defaults first
  // would let a re-run of the mount effect read our own URL instead of the
  // visitor's link.
  useEffect(() => {
    const fromUrl = decodeConfig(new URLSearchParams(window.location.search).get("c"));
    // Deferred so the server-rendered defaults hydrate cleanly first, then
    // the shared build swaps in — the URL is the external source of truth.
    if (fromUrl) startTransition(() => setConfig(fromUrl));
  }, []);
  useEffect(() => {
    if (config === DEFAULTS) return;
    const url = new URL(window.location.href);
    url.searchParams.set("c", encodeConfig(config));
    window.history.replaceState(null, "", url);
  }, [config]);

  const ref = referenceCode(config);
  const dims = dimensions(config);
  const conveyance = find(CONVEYANCE, config.conveyance)!;

  const shareUrl = typeof window === "undefined" ? "" : `${window.location.origin}/work-table-configurator?c=${encodeConfig(config)}`;

  const summary = useMemo(
    () =>
      [
        `Reference:        ${ref}`,
        `Conveyance:       ${conveyance.label}`,
        `Board width:      ${find(WIDTHS, config.width)!.label} (${dims.belt} mm belt)`,
        `Station length:   ${find(LENGTHS, config.length)!.label}`,
        `Footprint:        ${dims.length} × ${dims.depth} mm, worktop ${dims.worktop} mm, overall ${dims.overall} mm`,
        `Overhead light:   ${config.light ? "Yes" : "No"}`,
        `Rear parts trays: ${find(TRAYS, config.trays)!.label}`,
        `Swing-arm mount:  ${config.swingArm ? "Yes" : "No"}`,
      ].join("\n"),
    [ref, conveyance, config, dims]
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.email.trim() || !form.company.trim()) {
      setState("invalid");
      return;
    }
    setState("sending");
    const snapshot = previewRef.current?.snapshot() ?? undefined;
    const fields = {
      email: form.email.trim(),
      company: form.company.trim(),
      name: form.name.trim(),
      message: form.message.trim(),
      configuration: summary,
      page: shareUrl,
      website: form.website,
    };
    const result = await submitEnquiry("config", fields, snapshot ? { snapshot } : undefined);

    if (result.status === "sent") {
      track("quote_submit", { location: "/work-table-configurator" });
      setSentVia("api");
      setState("sent");
      return;
    }
    if (result.status === "invalid") {
      setState("invalid");
      return;
    }
    if (result.status === "fallback") {
      track("quote_submit", { location: "/work-table-configurator", transport: "mailto" });
      window.location.href = enquiryMailto(site.email, `Work table configuration — ${fields.company}`, [
        `Company:  ${fields.company}`,
        `Contact:  ${fields.name || "—"}`,
        `Email:    ${fields.email}`,
        "",
        summary,
        "",
        `Link:     ${shareUrl}`,
        fields.message ? "" : null,
        fields.message ? "Message:" : null,
        fields.message || null,
      ]);
      setSentVia("mailto");
      setState("sent");
      return;
    }
    setState("error");
  }

  const copyMailto = enquiryMailto(form.email, `PROMATION work table — ${ref}`, [summary, "", `Adjust this build: ${shareUrl}`]);

  const group = (title: string, children: React.ReactNode, note?: string) => (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{title}</legend>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
      {note ? <p className="mt-2 text-xs leading-relaxed text-slate-400">{note}</p> : null}
    </fieldset>
  );

  const chip = (selected: boolean, onClick: () => void, label: string) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded border px-3 py-1.5 text-left text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${
        selected
          ? "border-sky-400/70 bg-sky-400/15 text-sky-200"
          : "border-white/15 text-slate-300 hover:border-sky-300/40 hover:text-slate-100"
      }`}
    >
      {label}
    </button>
  );

  const field = "mt-1.5 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-sky-400/60 focus:outline-none";
  const label = "block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500";
  const telHref = `tel:+1${site.phone.replace(/\D/g, "")}`;

  return (
    <div className="relative isolate bg-[#0b0d10] text-slate-200 lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
      {/* The environment. Full-bleed behind the panels on desktop; the top of
          the page on mobile. The scene's own background matches #0b0d10, so
          the canvas edge is invisible. */}
      <div className="relative h-[52vh] lg:absolute lg:inset-0 lg:h-auto">
        <WorkTablePreview3D config={config} ref={previewRef} />
        <p className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-black shadow-lg shadow-black/40 md:block">
          Drag to rotate &middot; scroll to zoom
        </p>
        <div
          role="group"
          aria-label="Camera view"
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-0.5 rounded-full border border-white/10 bg-[#12161c]/85 p-1 backdrop-blur-md md:left-auto md:right-4 md:translate-x-0"
        >
          {VIEWS.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => previewRef.current?.setView(v.key)}
              className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating rail. The wrapper ignores the pointer on desktop so empty
          space still orbits the model; the rail opts back in. */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:pointer-events-none lg:h-full lg:px-8 lg:py-8">
        <div className="pointer-events-auto flex w-full flex-col gap-4 lg:h-full lg:max-w-sm lg:overflow-y-auto lg:pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(71,85,105,0.5)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-600/50">
          <p className="self-start rounded border border-amber-300/40 bg-amber-300/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-200">
            Internal prototype &mdash; unlisted page
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
            Work Table Configurator
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Build the station you need and send it to us. Dimensions and options are typical
            starting points &mdash; every build is confirmed against your board and process by a
            PROMATION engineer.
          </p>

          <div className="space-y-6 rounded-lg border border-white/10 bg-[#12161c]/85 p-5 backdrop-blur-md">
            {group(
              "Conveyance type",
              CONVEYANCE.map((o) => chip(config.conveyance === o.key, () => set("conveyance", o.key), o.label)),
              conveyance.note
            )}
            {group(
              "Board width",
              WIDTHS.map((o) => chip(config.width === o.key, () => set("width", o.key), o.label))
            )}
            {group(
              "Station length",
              LENGTHS.map((o) => chip(config.length === o.key, () => set("length", o.key), o.label))
            )}
            {group(
              "Overhead lighting",
              [chip(config.light, () => set("light", true), "Overhead light bar"), chip(!config.light, () => set("light", false), "No lighting")]
            )}
            {group(
              "Rear parts trays",
              TRAYS.map((o) => chip(config.trays === o.key, () => set("trays", o.key), o.label))
            )}
            {group(
              "Swing-arm monitor mount",
              [chip(config.swingArm, () => set("swingArm", true), "Include swing arm"), chip(!config.swingArm, () => set("swingArm", false), "None")]
            )}
          </div>

          {/* Spec sheet: the thing that gets forwarded internally. */}
          <div className="rounded-lg border border-white/10 bg-[#12161c]/85 p-5 backdrop-blur-md">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Your build</p>
              <p className="font-mono text-[11px] tracking-[0.1em] text-sky-300">{ref}</p>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-slate-500">Length</dt>
              <dd className="text-right font-mono text-slate-200">{dims.length} mm</dd>
              <dt className="text-slate-500">Depth</dt>
              <dd className="text-right font-mono text-slate-200">{dims.depth} mm</dd>
              <dt className="text-slate-500">Belt width</dt>
              <dd className="text-right font-mono text-slate-200">{dims.belt} mm</dd>
              <dt className="text-slate-500">Worktop height</dt>
              <dd className="text-right font-mono text-slate-200">{dims.worktop} mm</dd>
              <dt className="text-slate-500">Overall height</dt>
              <dd className="text-right font-mono text-slate-200">{dims.overall} mm</dd>
            </dl>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {[
                conveyance.label,
                find(WIDTHS, config.width)!.label,
                config.light ? "Overhead light" : null,
                config.trays !== "none" ? find(TRAYS, config.trays)!.label : null,
                config.swingArm ? "Swing arm" : null,
              ]
                .filter(Boolean)
                .map((t) => (
                  <li key={t as string} className="rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">
                    {t}
                  </li>
                ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              Reference and dimensions are indicative. IPC-certified setup &middot; Kenosha, WI &middot; US stock.
            </p>
          </div>

          {state === "sent" ? (
            <div className="rounded-lg border border-sky-400/30 bg-[#12161c]/85 p-5 backdrop-blur-md" role="status">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-sky-300">
                {sentVia === "api" ? "Request sent" : "Handed to your mail client"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {sentVia === "api" ? (
                  <>
                    A PROMATION engineer will come back to <span className="text-white">{form.email}</span> on build{" "}
                    <span className="font-mono text-sky-200">{ref}</span>, with a picture of exactly what you configured.
                  </>
                ) : (
                  <>
                    Your mail client should have opened with build <span className="font-mono text-sky-200">{ref}</span>{" "}
                    filled in &mdash; hit send and a PROMATION engineer will reply to {form.email}.
                  </>
                )}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a href={copyMailto} className="rounded border border-sky-300/30 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-sky-200 transition-colors hover:border-sky-300/60">
                  Email me a copy
                </a>
                <button type="button" onClick={() => setState("idle")} className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400 hover:text-slate-200">
                  Adjust and send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="rounded-lg border border-white/10 bg-[#12161c]/85 p-5 backdrop-blur-md">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Get a quote for this build</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="cfg-email" className={label}>Work email *</label>
                  <input id="cfg-email" type="email" autoComplete="email" required value={form.email} onChange={setField("email")} className={field} />
                </div>
                <div>
                  <label htmlFor="cfg-company" className={label}>Company *</label>
                  <input id="cfg-company" type="text" autoComplete="organization" required value={form.company} onChange={setField("company")} className={field} />
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="cfg-name" className={label}>Name</label>
                <input id="cfg-name" type="text" autoComplete="name" value={form.name} onChange={setField("name")} className={field} />
              </div>
              <div className="mt-3">
                <label htmlFor="cfg-message" className={label}>Anything we should know</label>
                <textarea
                  id="cfg-message"
                  rows={3}
                  value={form.message}
                  onChange={setField("message")}
                  placeholder="Board size and weight, process step, anything unusual about the application&hellip;"
                  className={`${field} resize-y leading-relaxed`}
                />
              </div>
              {/* honeypot — hidden from people, filled by bots */}
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
                <label htmlFor="cfg-website">Website</label>
                <input id="cfg-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={setField("website")} />
              </div>

              {state === "invalid" ? (
                <p className="mt-3 text-xs text-amber-200" role="alert">A work email and company name are all we need.</p>
              ) : null}
              {state === "error" ? (
                <p className="mt-3 text-xs text-amber-200" role="alert">
                  That did not go through. Try again, or call <a href={telHref} className="underline">{site.phone}</a>.
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="rounded bg-blue-500 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-blue-400 disabled:cursor-wait disabled:opacity-60"
                >
                  {state === "sending" ? "Sending…" : "Get a quote for this build"}
                </button>
                <a href={telHref} className="font-mono text-[11px] tracking-[0.1em] text-slate-400 hover:text-slate-200">
                  or call {site.phone}
                </a>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                We send your build and a snapshot of the model to a PROMATION engineer &mdash; nothing else, no list.
              </p>
            </form>
          )}

          <p className="max-w-sm pb-2 text-xs leading-relaxed text-slate-500">
            Need something that is not listed &mdash; different guarding, controls, ESD surfaces,
            conveyance heights? PROMATION builds a wide variety of custom stations; describe it in
            the message and we will quote to your spec.
          </p>
        </div>
      </div>
    </div>
  );
}
