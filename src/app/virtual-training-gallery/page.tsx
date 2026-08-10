import type { Metadata } from "next";
import { PageHero, SectionHeading, GlowButton } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { training } from "@/lib/content";

export const metadata: Metadata = {
  title: "Virtual Training Gallery",
  description:
    "PROMATION USA training videos — soldering robots, conveyors and TechMan cobots, from certified IPC experts with 20+ years of experience.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge Base"
        title="Virtual Training Gallery"
        intro={training.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Training" }]}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {training.categories.map((c, i) => (
            <RevealItem key={c.title} className="h-full">
              <div className="glass clip-corner flex h-full flex-col gap-4 p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-blue-600/60">
                    MODULE_{String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center border border-blue-400/30 bg-blue-400/5 font-mono text-blue-600 clip-corner"
                  >
                    ▶
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {c.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-20 text-center">
          <SectionHeading
            eyebrow="Join Promation Nation"
            title="The full video library lives on YouTube"
            intro='"Like" and "Subscribe" to stay up-to-date with our latest product training videos and new product introductions — or book a virtual video session with our team.'
            align="center"
          />
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <GlowButton href={training.youtube} external>
                Join Promation Nation
              </GlowButton>
              <GlowButton href="/contact" variant="ghost">
                Book a Virtual Session
              </GlowButton>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
