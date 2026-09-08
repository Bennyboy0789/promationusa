"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { WorkTablePreview3D } from "./WorkTablePreview3D";

/**
 * Interactive prototype for the configure-to-order work table.
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
 * fixed. No backend: the output is a plain-text summary the visitor sends
 * through the existing quote channels.
 */

const CONVEYANCE = [
  { key: "esd-flat", label: "3mm ESD edge belt", note: "The default for populated boards" },
  { key: "o6b-chain", label: "O6B roller chain", note: "Heavier assemblies and pallets" },
  { key: "pin-chain", label: "Pin chain", note: "Edge-only contact through thermal processes" },
  { key: "timing-belt", label: "Timing belt", note: "Positioning accuracy under the head" },
  { key: "round-belt", label: "Thin round belt", note: "Light boards, minimal contact" },
] as const;

const WIDTHS = [
  { key: "250", label: "Up to 250 mm boards" },
  { key: "330", label: "Up to 330 mm boards" },
  { key: "460", label: "Up to 460 mm boards" },
  { key: "custom-w", label: "Wider / custom" },
] as const;

const LENGTHS = [
  { key: "1000", label: "1.0 m station" },
  { key: "1500", label: "1.5 m station" },
  { key: "2000", label: "2.0 m station" },
  { key: "custom-l", label: "Longer / custom" },
] as const;

const TRAYS = [
  { key: "none", label: "No trays" },
  { key: "single", label: "Single rear row" },
  { key: "double", label: "Double rear row" },
] as const;

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

function labelFor<T extends { key: string; label: string }>(list: readonly T[], key: string) {
  return list.find((o) => o.key === key)?.label ?? key;
}

export function WorkTableConfigurator() {
  const [config, setConfig] = useState<Config>(DEFAULTS);
  const [message, setMessage] = useState("");
  const set = <K extends keyof Config>(k: K, v: Config[K]) => setConfig((c) => ({ ...c, [k]: v }));

  const summary = useMemo(
    () =>
      [
        `Work table / inspection station configuration`,
        ``,
        `Conveyance:       ${labelFor(CONVEYANCE, config.conveyance)}`,
        `Board width:      ${labelFor(WIDTHS, config.width)}`,
        `Station length:   ${labelFor(LENGTHS, config.length)}`,
        `Overhead light:   ${config.light ? "Yes" : "No"}`,
        `Rear parts trays: ${labelFor(TRAYS, config.trays)}`,
        `Swing-arm mount:  ${config.swingArm ? "Yes" : "No"}`,
      ].join("\n"),
    [config]
  );

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Work table configuration request"
  )}&body=${encodeURIComponent(summary + "\n\nMessage:\n" + message)}`;

  const group = (title: string, children: React.ReactNode) => (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{title}</legend>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );

  const chip = (selected: boolean, onClick: () => void, label: string, note?: string) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      title={note}
      className={`rounded border px-3 py-1.5 text-left text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${
        selected
          ? "border-sky-400/70 bg-sky-400/15 text-sky-200"
          : "border-white/15 text-slate-300 hover:border-sky-300/40 hover:text-slate-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative isolate bg-[#0b0d10] text-slate-200 lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
      {/* The environment. Full-bleed behind the panels on desktop; the top of
          the page on mobile. The scene's own background matches #0b0d10, so
          the canvas edge is invisible. */}
      <div className="relative h-[52vh] lg:absolute lg:inset-0 lg:h-auto">
        <WorkTablePreview3D config={config} />
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
          Drag to rotate &middot; scroll to zoom
        </p>
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
            Build the station you need and send us the result. Dimensions and options are typical
            starting points &mdash; every build is confirmed against your board and process by a
            PROMATION engineer.
          </p>

          <div className="space-y-6 rounded-lg border border-white/10 bg-[#12161c]/85 p-5 backdrop-blur-md">
            {group(
              "Conveyance type",
              CONVEYANCE.map((o) => chip(config.conveyance === o.key, () => set("conveyance", o.key), o.label, o.note))
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

          <div className="rounded-lg border border-white/10 bg-[#12161c]/85 p-5 backdrop-blur-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Your configuration</p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">{summary}</pre>

            <label htmlFor="config-message" className="mt-4 block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Your message
            </label>
            <textarea
              id="config-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Board size and weight, process step, anything unusual about the application&hellip;"
              className="mt-2 w-full resize-y rounded border border-white/15 bg-black/30 p-3 text-sm leading-relaxed text-slate-200 placeholder:text-slate-600 focus:border-sky-400/60 focus:outline-none"
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={mailto}
                className="rounded bg-blue-500 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-blue-400"
              >
                Send this configuration
              </a>
              <Link
                href="/contact"
                className="rounded border border-sky-300/30 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-sky-200 transition-colors hover:border-sky-300/60"
              >
                Quote form
              </Link>
              <a href={`tel:${site.phone.replace(/./g, "")}`} className="font-mono text-[11px] tracking-[0.1em] text-slate-500 hover:text-slate-300">
                {site.phone}
              </a>
            </div>
          </div>

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
