"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Interactive prototype for the configure-to-order work table.
 *
 * The option set comes from Mike's own list on the review call, and the belt
 * types are the ones he rattled off for PCB handling: 3mm ESD edge belt, O6B
 * roller chain, pin chain, timing belt, thin round belt. Dimensions are
 * labelled as typical rather than published spec — every real order is
 * confirmed by engineering, and the page says so rather than pretending the
 * catalogue is fixed.
 *
 * No backend: the output is a plain-text summary the visitor sends through
 * the existing quote channels. That keeps the prototype honest about what it
 * is — a requirements-capture aid, not a pricing engine.
 */

const CONVEYANCE = [
  { key: "esd-flat", label: "3mm ESD edge belt", note: "The default for populated boards" },
  { key: "o6b-chain", label: "O6B roller chain", note: "Heavier assemblies and pallets" },
  { key: "pin-chain", label: "Pin chain", note: "Edge-only contact through thermal processes" },
  { key: "timing-belt", label: "Timing belt", note: "Positioning accuracy under the head" },
  { key: "round-belt", label: "Thin round belt", note: "Light boards, minimal contact" },
] as const;

const WIDTHS = [
  { key: "250", label: 'Up to 250 mm boards' },
  { key: "330", label: 'Up to 330 mm boards' },
  { key: "460", label: 'Up to 460 mm boards' },
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

type Config = {
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

/** Front-elevation schematic that redraws as options change. */
function Preview({ config }: { config: Config }) {
  // Station length drives the drawn table width; board width drives lane depth.
  const tableW = { "1000": 240, "1500": 320, "2000": 400, "custom-l": 440 }[config.length];
  const cx = 270; // canvas midline
  const left = cx - tableW / 2;
  const topY = 190; // worktop line
  const laneH = { "250": 14, "330": 18, "460": 24, "custom-w": 28 }[config.width];

  // The belt pattern is the one visual cue per conveyance type.
  const lane = (() => {
    switch (config.conveyance) {
      case "o6b-chain":
      case "pin-chain": {
        const links = [];
        const pitch = config.conveyance === "o6b-chain" ? 18 : 26;
        for (let x = left + 10; x < left + tableW - 10; x += pitch) {
          links.push(<circle key={x} cx={x} cy={topY + laneH / 2} r={3} className="fill-blue-400/70" />);
        }
        return links;
      }
      case "timing-belt": {
        const teeth = [];
        for (let x = left + 8; x < left + tableW - 8; x += 12) {
          teeth.push(<rect key={x} x={x} y={topY + laneH - 5} width={6} height={4} className="fill-blue-400/60" />);
        }
        return teeth;
      }
      case "round-belt":
        return [
          <line key="a" x1={left + 8} y1={topY + 5} x2={left + tableW - 8} y2={topY + 5} strokeWidth={2} className="stroke-blue-400/70" />,
          <line key="b" x1={left + 8} y1={topY + laneH - 5} x2={left + tableW - 8} y2={topY + laneH - 5} strokeWidth={2} className="stroke-blue-400/70" />,
        ];
      default: // esd-flat
        return [
          <rect key="belt" x={left + 6} y={topY + 4} width={tableW - 12} height={laneH - 8} rx={2} className="fill-blue-500/25" />,
        ];
    }
  })();

  return (
    <svg viewBox="0 0 580 340" role="img" aria-label="Schematic preview of the configured work table" className="w-full">
      {/* floor line */}
      <line x1={30} y1={310} x2={550} y2={310} className="stroke-line" strokeWidth={1} />

      {/* legs */}
      <rect x={left + 8} y={topY + laneH} width={10} height={310 - topY - laneH} className="fill-slate-400/50" />
      <rect x={left + tableW - 18} y={topY + laneH} width={10} height={310 - topY - laneH} className="fill-slate-400/50" />
      {/* worktop + lane */}
      <rect x={left} y={topY} width={tableW} height={laneH} rx={3} className="fill-slate-300/60" />
      {lane}

      {/* rear parts trays, drawn raised behind the worktop */}
      {config.trays !== "none" && (
        <g>
          <rect x={left + 20} y={topY - 26} width={tableW - 40} height={12} rx={2} className="fill-slate-400/45" />
          {config.trays === "double" && (
            <rect x={left + 20} y={topY - 44} width={tableW - 40} height={12} rx={2} className="fill-slate-400/45" />
          )}
          <line x1={left + 30} y1={topY - 14} x2={left + 30} y2={topY} className="stroke-slate-400/60" strokeWidth={3} />
          <line x1={left + tableW - 30} y1={topY - 14} x2={left + tableW - 30} y2={topY} className="stroke-slate-400/60" strokeWidth={3} />
        </g>
      )}

      {/* overhead light bar on its gantry */}
      {config.light && (
        <g>
          <line x1={left + 14} y1={80} x2={left + 14} y2={topY} className="stroke-slate-400/70" strokeWidth={4} />
          <line x1={left + tableW - 14} y1={80} x2={left + tableW - 14} y2={topY} className="stroke-slate-400/70" strokeWidth={4} />
          <rect x={left + 10} y={68} width={tableW - 20} height={14} rx={3} className="fill-slate-300/80" />
          <rect x={left + 24} y={82} width={tableW - 48} height={4} rx={2} className="fill-amber-300/90" />
        </g>
      )}

      {/* swing-arm monitor mount */}
      {config.swingArm && (
        <g>
          <line x1={left + tableW + 16} y1={topY + laneH} x2={left + tableW + 16} y2={120} className="stroke-slate-400/70" strokeWidth={4} />
          <line x1={left + tableW + 16} y1={128} x2={left + tableW + 58} y2={112} className="stroke-slate-400/70" strokeWidth={4} />
          <rect x={left + tableW + 46} y={84} width={44} height={30} rx={3} className="fill-slate-500/70" />
        </g>
      )}
    </svg>
  );
}

export function WorkTableConfigurator() {
  const [config, setConfig] = useState<Config>(DEFAULTS);
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
  )}&body=${encodeURIComponent(summary + "\n\nBoard / process details:\n")}`;

  const group = (title: string, children: React.ReactNode) => (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{title}</legend>
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
      className={`clip-corner border px-3 py-2 text-left text-sm transition-colors ${
        selected
          ? "border-blue-500/60 bg-blue-500/10 text-blue-700"
          : "border-line text-foreground/80 hover:border-blue-400/40"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="clip-corner inline-block border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-700">
        Internal prototype — unlisted page
      </p>
      <h1 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Work Table Configurator
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-foreground/85">
        Build up the inspection station or work table you need and send us the result. Dimensions
        and options shown are typical starting points — every station is confirmed against your
        board and process by a PROMATION engineer before anything is built.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-8">
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

        <div>
          <div className="clip-corner border border-line bg-white/60 p-4">
            <Preview config={config} />
          </div>

          <div className="clip-corner mt-6 border border-line p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Your configuration</p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/85">{summary}</pre>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={mailto}
                className="clip-corner bg-blue-600 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-blue-500"
              >
                Send this configuration
              </a>
              <Link
                href="/contact"
                className="clip-corner border border-blue-400/30 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-blue-700 transition-colors hover:border-blue-400/60"
              >
                Or use the quote form
              </Link>
              <a href={`tel:${site.phone.replace(/\./g, "")}`} className="font-mono text-[11px] tracking-[0.1em] text-muted">
                {site.phone}
              </a>
            </div>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Something you need that is not listed — different guarding, controls, ESD surfaces,
            conveyance heights? PROMATION builds a wide variety of custom stations; describe it in
            the message and we will quote to your spec.
          </p>
        </div>
      </div>
    </div>
  );
}
