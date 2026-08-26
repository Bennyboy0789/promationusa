import Image from "next/image";
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
        aside={
          <figure className="relative mx-auto -mb-16 w-[20rem] sm:w-[24rem] xl:w-[29rem]">
            <div className="relative h-[24rem] w-full sm:h-[29rem] xl:h-[34rem]">
              <div
                aria-hidden
                className="absolute inset-x-10 bottom-0 h-32 rounded-[50%] bg-blue-500/20 blur-2xl"
              />
              <Image
                src={whatWeDo.quote.portrait}
                alt={`${whatWeDo.quote.author}, ${whatWeDo.quote.role} of PROMATION USA`}
                fill
                priority
                sizes="(max-width: 640px) 288px, (max-width: 1280px) 320px, 368px"
                className="object-contain object-bottom"
              />
            </div>
            {/* sits low over the torso so it never crosses his face */}
            <figcaption className="absolute bottom-24 -left-4 z-10 bg-white px-5 py-3.5 shadow-[0_12px_30px_-12px_rgba(13,27,46,0.45)] clip-corner sm:-left-6 sm:bottom-28">
              <span className="block font-display text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl">
                {whatWeDo.quote.author}
              </span>
              <span className="mt-1 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-[11px]">
                {whatWeDo.quote.role}
              </span>
            </figcaption>
          </figure>
        }
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Mission — full width */}
        <SectionHeading
          eyebrow="Our Mission"
          title="Best value, defined."
          intro={whatWeDo.mission}
          align="center"
          decode
        />

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
