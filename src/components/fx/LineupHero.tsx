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
    href: "/robotic-soldering",
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
    href: "/robotic-dispensing",
    image: "/images/dispensing-photo.webp",
    brands: "QUICK ET · QS Series",
    blurb: "Precision dispensing for adhesives, potting and conformal coating.",
  },
  {
    name: "Laser Marking",
    href: "/laser-marking",
    image: "/images/laser-photo.webp",
    brands: "PANDA Robotics",
    blurb: "Permanent, high-contrast PCB traceability marking — inline or standalone.",
  },
  {
    name: "TechMan Cobots",
    href: "/collaborative-robots",
    image: "/images/cobots-photo.webp",
    brands: "TM5 – TM20",
    blurb: "Collaborative robots with built-in vision for flexible cell automation.",
  },
  {
    name: "Mobile Robots",
    href: "/mobile-robots",
    image: "/images/mobile-robot-photo.webp",
    brands: "AMR line loading",
    blurb: "Autonomous mobile robots that feed and unload your line unattended.",
  },
];

const ALL_LINES = [
  { label: "Robotic Soldering", href: "/robotic-soldering" },
  { label: "PCB Handling", href: "/pcb-handling" },
  { label: "Dispensing", href: "/robotic-dispensing" },
  { label: "Screw Driving", href: "/robotic-screw-driving" },
  { label: "Laser Marking", href: "/laser-marking" },
  { label: "Cobots", href: "/collaborative-robots" },
  { label: "Depaneling", href: "/pcb-depaneling" },
  { label: "Label Placement", href: "/label-placement" },
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

  /** Move by a signed number of slides, wrapping in both directions. */
  const step = useCallback(
    (delta: number) =>
      setActive((i) => (i + delta + LINES.length) % LINES.length),
    []
  );

  // --- swipe, phone and tablet ---------------------------------------------
  //
  // Written with pointer events rather than a drag library because the hard
  // part is not the drag, it is *not* stealing vertical scroll. The axis is
  // decided once per gesture from the first few pixels of movement: past the
  // slop threshold the larger delta wins and the gesture is locked, so a
  // slightly diagonal flick still does what the reader meant. `touch-action:
  // pan-y` tells the browser it keeps vertical and we take horizontal, which
  // is what stops the page juddering mid-swipe.
  const SWIPE_SLOP = 10; // px before an axis is chosen
  const SWIPE_TRIGGER = 48; // px of travel that counts as a swipe
  const gesture = useRef<{
    x: number;
    y: number;
    axis: "none" | "x" | "y";
    id: number;
  } | null>(null);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Never hijack a mouse drag — that is text selection, and on desktop the
    // tab bar already exists.
    if (e.pointerType === "mouse") return;
    gesture.current = { x: e.clientX, y: e.clientY, axis: "none", id: e.pointerId };
    setDragging(true);
    setPaused(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;

    if (g.axis === "none") {
      if (Math.abs(dx) < SWIPE_SLOP && Math.abs(dy) < SWIPE_SLOP) return;
      g.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      // A vertical gesture is the reader scrolling the page. Let go of it.
      if (g.axis === "y") {
        gesture.current = null;
        setDragging(false);
        setPaused(false);
        setDragX(0);
        return;
      }
    }
    // Follow the finger, damped, so the plate feels attached to the gesture
    // without sliding the whole way off.
    setDragX(dx * 0.4);
  }, []);

  const endGesture = useCallback(
    (e: React.PointerEvent) => {
      const g = gesture.current;
      gesture.current = null;
      setDragging(false);
      setDragX(0);
      setPaused(false);
      if (!g || g.axis !== "x") return;
      const dx = e.clientX - g.x;
      if (Math.abs(dx) < SWIPE_TRIGGER) return;
      // Swipe left travels forward, matching every carousel people already use.
      step(dx < 0 ? 1 : -1);
    },
    [step]
  );

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
            className="group mt-4 inline-flex min-h-[24px] items-center gap-2 border-b border-sky-300/40 pb-1.5 pt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:border-sky-300"
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
            Official North American source · QUICK · PANDA · TechMan
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

          {/* every line we sell, one click away — directly above the counter */}
          <motion.nav
            aria-label="Product lines"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-7 border-t border-white/10 pt-5 sm:mt-8"
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
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
              {active + 1}/{LINES.length}
            </span>
          </div>
        </div>

        {/* ---------- phone & tablet: the plate, full-bleed and generous ---------- */}
        <div
          className="relative left-1/2 mt-8 h-[46vh] min-h-[300px] w-screen -translate-x-1/2 overflow-hidden lg:hidden"
          // The browser keeps vertical scrolling; we take horizontal.
          style={{ touchAction: "pan-y" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
          role="group"
          aria-roledescription="carousel"
          aria-label="Product lines — swipe to change"
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate3d(${dragX}px, 0, 0)`,
              transition: dragging ? "none" : "transform 320ms cubic-bezier(0.22, 0.68, 0.19, 1)",
            }}
          >
            <div className="absolute inset-0" style={FEATHER_MOBILE}>
              <Plate line={line} reduced={!!reduced} priority={false} />
            </div>
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
              className="mt-2 inline-flex min-h-[24px] items-center gap-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white"
            >
              View systems <span aria-hidden>→</span>
            </Link>
          </div>

          <p className="sr-only" aria-live="polite">
            {line.name}, {active + 1} of {LINES.length}
          </p>
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
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
            {active + 1}/{LINES.length}
          </span>
        </div>
      </div>
    </section>
  );
}
