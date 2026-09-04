"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GlowButton } from "@/components/ui";
import { DecodeText } from "@/components/fx/DecodeText";
import { ParticleImage } from "@/components/fx/ParticleImage";
import { PixelReveal } from "@/components/fx/PixelReveal";

/** film-grain noise, generated inline so no asset is needed */
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

export function CinematicHero() {
  return (
    <section className="relative overflow-hidden bg-[#050b18] text-white">
      {/* faint blueprint grid + glow */}
      <div className="grid-bg grid-fade absolute inset-0 opacity-60" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-40 right-[15%] h-[480px] w-[680px] rounded-full bg-blue-600/15 blur-[140px]"
      />
      {/* film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")` }}
      />

      <div className="relative mx-auto flex min-h-[88svh] w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        {/* ---- copy (left half) ---- */}
        <div className="lg:w-1/2 lg:pr-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-3 border border-white/20 bg-white/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-sky-300 backdrop-blur-sm clip-corner"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping-soft" />
            Robotic Automation — Kenosha, Wisconsin
          </motion.p>

          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <DecodeText text="WE PUT ROBOTS" as="span" className="block text-white" />
            <DecodeText
              text="ON YOUR LINE_"
              as="span"
              speed={38}
              className="gradient-text-light block"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            For 25+ years PROMATION USA has armed electronics manufacturers
            with award-winning robotic soldering, PCB handling, laser marking,
            cobots and depaneling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <GlowButton href="/products">Explore Products</GlowButton>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border border-white/25 bg-white/5 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:border-sky-300/70 hover:text-sky-200 clip-corner"
            >
              Talk to an Engineer
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400"
          >
            <span className="text-amber-400">★</span> NPI Award Winner ·{" "}
            <span className="text-amber-400">★</span> 3× TITAN Gold · Official
            QUICK / PANDA / TechMan Source
          </motion.p>
        </div>

      </div>

      {/* ---- machine as particles, filling the right half, scattered by the cursor ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative h-[420px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2"
      >
        <ParticleImage
          src="/images/particle-machine.webp"
          fit="cover"
          gap={6}
          className="h-full w-full"
        />
        {/* blend the field into the dark stage on its inner edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#050b18] to-transparent lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050b18] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050b18] to-transparent"
        />
        <Link
          href="/robotic-soldering-glance"
          className="group absolute bottom-4 right-4 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sky-300/80 transition-colors hover:text-sky-200 sm:bottom-6 sm:right-6"
        >
          QUICK Robotic Soldering System
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>

      {/* thin letterbox line */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-sky-400/30" />

      {/* pixel-grid reveal on load */}
      <PixelReveal pattern="top-left" className="z-20" />
    </section>
  );
}
