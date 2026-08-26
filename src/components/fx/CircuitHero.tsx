"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { GlowButton } from "@/components/ui";
import { CircuitField } from "@/components/fx/CircuitField";

const LINES = [
  { label: "Robotic Soldering", tone: "text-sky-300" },
  { label: "PCB Handling", tone: "text-sky-300" },
  { label: "Dispensing", tone: "text-sky-300" },
  { label: "Screw Driving", tone: "text-sky-300" },
  { label: "Laser Marking", tone: "text-sky-300" },
  { label: "Cobots", tone: "text-sky-300" },
  { label: "X-Ray Inspection", tone: "text-sky-300" },
];

export function CircuitHero() {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: [0.21, 0.68, 0.19, 1] as const },
        };

  return (
    <section className="relative isolate overflow-hidden bg-[#040a16] text-white">
      {/* the board itself */}
      <CircuitField />

      {/* depth: a warm pool where the joints land, cool wash elsewhere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 h-[520px] w-[620px] rounded-full bg-amber-500/[0.07] blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-32 h-[560px] w-[720px] rounded-full bg-blue-600/15 blur-[150px]"
      />

      {/* legibility scrim — strongest at the left where the copy sits */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#040a16_0%,rgba(4,10,22,0.86)_30%,rgba(4,10,22,0.45)_58%,rgba(4,10,22,0.1)_80%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#040a16] to-transparent"
      />

      <div className="relative mx-auto flex min-h-[86svh] w-full min-w-0 max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...rise(0.05)} className="w-full min-w-0 max-w-3xl">
          <p className="mb-7 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 border border-white/15 bg-white/[0.04] px-3.5 py-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-sky-300 backdrop-blur-sm clip-corner sm:px-4 sm:text-[10px] sm:tracking-[0.28em]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Official QUICK · PANDA · TechMan source
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-white">Automation that lands</span>
            <span className="block bg-gradient-to-r from-sky-200 via-sky-300 to-amber-200 bg-clip-text text-transparent">
              every joint.
            </span>
          </h1>
        </motion.div>

        <motion.p
          {...rise(0.2)}
          className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300/90"
        >
          Robotic soldering, PCB handling, dispensing, screw driving and laser
          marking — engineered into your line, held in US stock, and supported
          by IPC-certified engineers.
        </motion.p>

        <motion.div
          {...rise(0.32)}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <GlowButton href="/products">Explore the catalog</GlowButton>
          <Link
            href="/pcb-trial"
            className="group inline-flex items-center gap-2 border border-white/20 bg-white/[0.04] px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:border-amber-300/60 hover:text-amber-100 clip-corner"
          >
            Send us your board
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>

        {/* the seven lines, as a routed strip along the bottom */}
        <motion.ul
          {...rise(0.46)}
          className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400"
        >
          {LINES.map((l) => (
            <li key={l.label} className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-1 w-1 rotate-45 bg-sky-400/70"
              />
              {l.label}
            </li>
          ))}
        </motion.ul>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-sky-400/25" />
    </section>
  );
}
