import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { Marquee } from "@/components/fx/Marquee";
import { partners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "PROMATION USA's alliance network — QUICK, PANDA Robotics, TechMan, Omron, OnRobot, SCHUNK, Kester, Dorner and more.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Alliance Network"
        title="Partnerships"
        intro="No single vendor covers a whole line. These are the technology brands PROMATION USA integrates, distributes and collaborates with."
        crumbs={[{ label: "Home", href: "/" }, { label: "Partners" }]}
      />

      <div className="border-b border-line py-12">
        <Marquee duration={38}>
          {partners.map((p) => (
            <span
              key={p.name}
              className="font-display text-3xl font-semibold tracking-tight text-muted/40"
            >
              {p.name}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Directory"
          title="The network, decoded"
          align="center"
          decode
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, i) => (
            <RevealItem key={p.name} className="h-full">
              <TiltCard className="group relative h-full" maxTilt={6}>
                <div className="glass clip-corner flex h-full flex-col gap-2 p-6 transition-colors hover:border-blue-400/40">
                  <span className="font-mono text-[10px] text-blue-600/60">
                    NODE_{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-500">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted">{p.blurb}</p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
