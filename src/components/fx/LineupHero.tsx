"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

/**
 * The hero has one job: say what PROMATION sells, prove who they are, and put
 * a buyer one click from the right product line or a quote.
 *
 * The machine imagery runs full-height and bleeds off the edge of the screen —
 * the catalogue is the argument, so it gets the room to be the argument.
 */

type Line = {
  name: string;
  href: string;
  image: string;
  brands: string;
  blurb: string;
};

const LINES: Line[] = [
  {
    name: "Robotic Soldering",
    href: "/robotic-soldering-glance",
    image: "/images/soldering-photo.webp",
    brands: "QUICK · PANDA",
    blurb: "Benchtop and in-line selective soldering — iron-tip, laser and hot bar.",
  },
  {
    name: "PCB Handling",
    href: "/pcb-handling",
    image: "/images/pcb-handling-photo.webp",
    brands: "SMEMA-compliant",
    blurb: "Loaders, unloaders, conveyors, buffers, flippers and inspection stations.",
  },
  {
    name: "Robotic Dispensing",
    href: "/auto-dispensing-at-a-glance",
    image: "/images/dispensing-photo.webp",
    brands: "QUICK ET · QS Series",
    blurb: "Precision dispensing for adhesives, potting and conformal coating.",
  },
  {
    name: "Laser Marking",
    href: "/laser-marking-at-a-glance",
    image: "/images/laser-photo.webp",
    brands: "PANDA Robotics",
    blurb: "Permanent, high-contrast PCB traceability marking — inline or standalone.",
  },
  {
    name: "TechMan Cobots",
    href: "/techman-collaborative-robots",
    image: "/images/cobots-photo.webp",
    brands: "TM5 – TM20",
    blurb: "Collaborative robots with built-in vision for flexible cell automation.",
  },
  {
    name: "Mobile Robots",
    href: "/intelligent-mobile-robot-solutions",
    image: "/images/mobile-robot-photo.webp",
    brands: "AMR line loading",
    blurb: "Autonomous mobile robots that feed and unload your line unattended.",
  },
];

const ALL_LINES = [
  { label: "Robotic Soldering", href: "/robotic-soldering-glance" },
  { label: "PCB Handling", href: "/pcb-handling" },
  { label: "Dispensing", href: "/auto-dispensing-at-a-glance" },
  { label: "Screw Driving", href: "/auto-screw-driving-at-a-glance" },
  { label: "Laser Marking", href: "/laser-marking-at-a-glance" },
  { label: "Cobots", href: "/techman-collaborative-robots" },
  { label: "X-Ray Inspection", href: "/xray-at-a-glance" },
];

const DWELL = 5600;

/** Feather the plate into the page instead of covering it with a panel. */
const FEATHER_X: React.CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 16%, rgba(0,0,0,0.85) 34%, #000 50%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 16%, rgba(0,0,0,0.85) 34%, #000 50%)",
};

const FEATHER_Y: React.CSSProperties = {
  maskImage:
    "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, #000 10%, #000 70%, rgba(0,0,0,0.6) 92%, rgba(0,0,0,0.3) 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, #000 10%, #000 70%, rgba(0,0,0,0.6) 92%, rgba(0,0,0,0.3) 100%)",
};

/** Mobile plate bleeds full width, so it only needs a soft foot. */
const FEATHER_MOBILE: React.CSSProperties = {
  maskImage:
    "linear-gradient(to bottom, #000 0%, #000 52%, rgba(0,0,0,0.4) 84%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, #000 0%, #000 52%, rgba(0,0,0,0.4) 84%, transparent 100%)",
};

/**
 * One machine, held large, drifting slowly.
 *
 * Declared at module scope on purpose: a component defined inside the render
 * body gets a fresh identity every render, so React remounts it and replays
 * the entrance animation whenever unrelated state (like hover) changes.
 */
function Plate({
  line,
  reduced,
  priority,
}: {
  line: Line;
  reduced: boolean;
  priority: boolean;
}) {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={line.href}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ scale: reduced ? 1 : 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduced ? 0 : DWELL / 1000 + 2.5, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src={line.image}
            alt={`${line.name} — ${line.blurb}`}
            fill
            priority={priority}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function LineupHero() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => setActive((i) => (i + 1) % LINES.length), []);

  useEffect(() => {
    if (reduced || paused) return;
    timer.current = setTimeout(advance, DWELL);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, paused, reduced, advance]);

  const line = LINES[active];

  return (
    <section
      className="relative overflow-hidden bg-[#050d1a] text-white"
      // Hold the current machine while the pointer is in the hero — the content
      // column overlays the plate, so this has to live on the section itself.
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid-bg grid-fade absolute inset-0 opacity-30" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-52 -top-40 h-[560px] w-[720px] rounded-full bg-blue-600/15 blur-[160px]"
      />

      {/* ---------- the machine: full height, bleeding off the right ---------- */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        {/*
          The plate is feathered with a mask rather than covered by an opaque
          panel: an overlay painted in the page colour cannot match the glow
          behind it, which leaves a visible seam down the middle. Masking makes
          the photograph itself dissolve into whatever is actually behind it.
        */}
        <div className="absolute inset-0" style={FEATHER_X}>
          <div className="absolute inset-0" style={FEATHER_Y}>
            <Plate line={line} reduced={!!reduced} priority />
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_80%_at_100%_100%,rgba(5,13,26,0.95)_0%,rgba(5,13,26,0.72)_38%,rgba(5,13,26,0)_72%)]"
        />

        <div className="absolute bottom-16 right-10 max-w-sm text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sky-300">
            {line.brands}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-white">
            {line.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{line.blurb}</p>
          <Link
            href={line.href}
            className="group mt-4 inline-flex items-center gap-2 border-b border-sky-300/40 pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:border-sky-300"
          >
            View systems
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* ------------------------------ the pitch ------------------------------ */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pb-10 lg:pt-12">
        <div className="lg:max-w-[43%]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-sky-300 sm:text-[10px] sm:tracking-[0.2em] lg:tracking-[0.14em]"
          >
            Official North American source · QUICK · PANDA · TechMan · SEAMARK
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-[1.9rem] font-bold leading-[1.08] tracking-tight sm:text-[2.5rem] lg:text-[3rem]"
          >
            Robotic soldering &amp; PCB assembly automation
            <span className="block text-sky-300">for electronics manufacturers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:mt-5 sm:text-base"
          >
            For over 20 years PROMATION USA has engineered soldering, handling,
            dispensing, screw driving and marking machines into production lines
            across North America — held in US stock and supported by
            IPC-certified engineers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3"
          >
            <Link
              href="/contact"
              className="clip-corner bg-blue-600 px-5 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-blue-500 sm:px-7 sm:text-xs sm:tracking-[0.18em]"
            >
              Request a quote
            </Link>
            <a
              href={`tel:+1${site.phone.replace(/\D/g, "")}`}
              className="clip-corner border border-white/25 bg-white/[0.04] px-5 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors hover:border-sky-300/70 hover:text-sky-200 sm:px-7 sm:text-xs sm:tracking-[0.18em]"
            >
              {site.phone}
            </a>
            <Link
              href="/pcb-trial"
              className="px-1 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-300 underline-offset-4 transition-colors hover:text-amber-200 hover:underline sm:px-2 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]"
            >
              Send us your board →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 border-t border-white/10 pt-5 sm:mt-8"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">
              Questions worth asking any supplier
            </p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-3 sm:gap-5">
              {[
                ["Who holds the stock?", "We do — in the US."],
                ["Who answers the phone?", "An IPC-certified engineer."],
                ["Can you try before you buy?", "Send us your board."],
              ].map(([q, a]) => (
                <li key={q} className="text-[13px] leading-snug">
                  <span className="block text-slate-400">{q}</span>
                  <span className="block font-semibold text-white">{a}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* which machine is showing — desktop control sits under the copy */}
          <div className="mt-7 hidden items-center gap-3 lg:flex">
            <div className="flex flex-1 gap-1.5">
              {LINES.map((l, i) => (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${l.name}`}
                  aria-current={i === active}
                  className="group/tab relative flex h-6 flex-1 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  <span className="relative h-0.5 w-full overflow-hidden bg-white/15">
                    <span
                      className={`absolute inset-y-0 left-0 bg-sky-400 transition-all duration-500 ${
                        i === active ? "w-full" : "w-0 group-hover/tab:w-full"
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
              {active + 1}/{LINES.length}
            </span>
          </div>
        </div>

        {/* ---------- phone & tablet: the plate, full-bleed and generous ---------- */}
        <div className="relative left-1/2 mt-8 h-[46vh] min-h-[300px] w-screen -translate-x-1/2 overflow-hidden lg:hidden">
          <div className="absolute inset-0" style={FEATHER_MOBILE}>
            <Plate line={line} reduced={!!reduced} priority={false} />
          </div>
          <div className="absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-300">
              {line.brands}
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-white">
              {line.name}
            </h2>
            <Link
              href={line.href}
              className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white"
            >
              View systems <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 lg:hidden">
          <div className="flex flex-1 gap-1.5">
            {LINES.map((l, i) => (
              <button
                key={l.href}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${l.name}`}
                aria-current={i === active}
                className="relative flex h-6 flex-1 items-center"
              >
                <span className="relative h-0.5 w-full overflow-hidden bg-white/15">
                  <span
                    className={`absolute inset-y-0 left-0 bg-sky-400 transition-all duration-500 ${
                      i === active ? "w-full" : "w-0"
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
            {active + 1}/{LINES.length}
          </span>
        </div>

        {/* --------------- every line we sell, one click away --------------- */}
        <motion.nav
          aria-label="Product lines"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-9 border-t border-white/10 pt-5 lg:mt-8 lg:max-w-[43%]"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {ALL_LINES.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-300 transition-colors hover:text-sky-300"
                >
                  <span
                    aria-hidden
                    className="h-1 w-1 rotate-45 bg-sky-400/60 transition-colors group-hover:bg-sky-300"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/store"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-amber-200/80 transition-colors hover:text-amber-200"
              >
                <span aria-hidden className="h-1 w-1 rotate-45 bg-amber-300/70" />
                Parts &amp; Consumables
              </Link>
            </li>
          </ul>
        </motion.nav>
      </div>
    </section>
  );
}
