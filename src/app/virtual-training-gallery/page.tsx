import type { Metadata } from "next";
import { PageHero, SectionHeading, GlowButton } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { VideoEmbed } from "@/components/VideoEmbed";
import { CtaBar } from "@/components/Conversion";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { training } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/virtual-training-gallery" },
  title: "Virtual Training Gallery",
  description:
    "Free training videos from PROMATION USA — soldering robots, PCB conveyors and TechMan cobots, recorded by IPC-certified engineers.",
};

const PATH = "/virtual-training-gallery";

export default function TrainingPage() {
  const total = training.categories.reduce((n, c) => n + c.videos.length, 0);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Virtual Training Gallery", href: PATH },
        ]}
      />

      <PageHero
        eyebrow="Knowledge Base"
        title="Virtual Training Gallery"
        intro={training.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Training" }]}
      />

      <CtaBar
        label="Want this on your own machine?"
        primary={{ label: "Book a session", href: "/book-a-demo" }}
        secondary={{ label: "Request a quote", href: "/contact" }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
            {total} training videos, free to watch and recorded by the engineers
            who set these machines up. Setup, adjustment, programming and
            maintenance — the things a manual describes and a video actually
            shows.
          </p>
        </Reveal>

        {training.categories.map((c, ci) => (
          <section key={c.title} className="mt-16">
            <SectionHeading
              eyebrow={`Module ${String(ci + 1).padStart(2, "0")} — ${c.videos.length} ${
                c.videos.length === 1 ? "video" : "videos"
              }`}
              title={c.title}
              intro={c.body}
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {c.videos.map((id) => (
                <Reveal key={id}>
                  <VideoEmbed id={id} pageUrl={PATH} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-20 text-center">
          <SectionHeading
            eyebrow="Join Promation Nation"
            title="More on the YouTube channel"
            intro="Subscribe for new product training and introductions as they are published — or book a session and we will walk your team through it on your own parts."
            align="center"
          />
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <GlowButton href={training.youtube} external cta="training-youtube">
                Join Promation Nation
              </GlowButton>
              <GlowButton href="/book-a-demo" variant="ghost">
                Book a Virtual Session
              </GlowButton>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
