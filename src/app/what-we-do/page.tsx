import type { Metadata } from "next";
import { PageHero, SectionHeading, GlowButton } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { Counter } from "@/components/fx/Counter";
import { whatWeDo } from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "PROMATION USA — a world-class leader in automated handling solutions, robotic soldering systems and technical furniture for electronics manufacturing.",
};

const pillars = [
  {
    title: "PCB Handling Equipment",
    body: "Best-in-class printed circuit board handling — loaders, conveyors, buffers and inspection stations engineered around SMEMA standards.",
  },
  {
    title: "Robotic Soldering Systems",
    body: "Innovative robotic soldering with state-of-the-art features for batch and in-line production selective soldering applications.",
  },
  {
    title: "Laser Marking & Label Placement",
    body: "In-line label placement and laser marking systems for permanent traceability and compliance.",
  },
  {
    title: "Workstation Solutions",
    body: "Technical furniture and workstation platforms tuned for high-throughput electronics assembly.",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="What We Do"
        intro={whatWeDo.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "What We Do" }]}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Mission */}
        <div className="grid gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Our Mission"
            title="Best value, defined."
            intro={whatWeDo.mission}
            decode
          />
          <Reveal direction="left" delay={0.15}>
            <figure className="border-beam clip-corner h-full p-8 lg:p-10">
              <span aria-hidden className="font-display text-6xl leading-none text-blue-600/30">
                &ldquo;
              </span>
              <blockquote className="mt-2 text-lg leading-relaxed text-foreground/90">
                {whatWeDo.quote.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-blue-400/60" aria-hidden />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">
                  {whatWeDo.quote.author} — {whatWeDo.quote.role}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Pillars */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Core Competencies"
            title="Four disciplines, one platform"
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <RevealItem key={p.title} className="h-full">
                <div className="glass clip-corner h-full p-7">
                  <span className="font-mono text-[11px] text-blue-600/60">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Numbers */}
        <div className="mt-24 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
          {[
            { value: 100, suffix: "%", label: "Customer Satisfaction Goal" },
            { value: 20, suffix: "+", label: "Years in Automation" },
            { value: 4, suffix: "", label: "Regions Served" },
            { value: 1, suffix: " yr", label: "Typical ROI on Soldering" },
          ].map((s) => (
            <div key={s.label} className="bg-white/90 px-6 py-8 text-center">
              <div className="font-display text-3xl font-bold text-blue-600 sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 text-center">
            <GlowButton href="/contact">Start the Conversation</GlowButton>
          </div>
        </Reveal>
      </div>
    </>
  );
}
