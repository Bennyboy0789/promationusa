import type { Metadata } from "next";
import { PageHero, SectionHeading, GlowButton, Chip } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { careers } from "@/lib/content";
import { site } from "@/lib/site";
import { RequestQuoteBlock } from "@/components/Conversion";
import { JobPostingJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Career Opportunities",
  description:
    "Join the PROMATION USA team — automation careers in the micro-electronics manufacturing industry, Kenosha WI.",
};

export default function CareersPage() {
  // Standing roles rather than dated requisitions, so the posting date is the
  // page build rather than an invented one.
  const posted = new Date().toISOString().slice(0, 10);

  return (
    <>
      {careers.openings.map((job) => (
        <JobPostingJsonLd
          key={job.title}
          title={job.title}
          description={[
            "Responsibilities: " + job.responsibilities.join("; "),
            "Requirements: " + job.requirements.join("; "),
            "Beneficial skills: " + job.beneficialSkills.join("; "),
          ].join(" ")}
          employmentType={job.type}
          datePosted={posted}
        />
      ))}
      <PageHero
        eyebrow="Join the Team"
        title="Career Opportunities"
        intro={careers.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* How to apply */}
        <Reveal>
          <div className="border-beam clip-corner p-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
              {"// How to Apply"}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">
              {careers.applyInstructions}
            </p>
            <div className="mt-6">
              <GlowButton href={`mailto:${site.email}?subject=YourName-Resume`}>
                Send Your Resume
              </GlowButton>
            </div>
          </div>
        </Reveal>

        {/* Openings */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Open Positions"
            title="Current openings"
            decode
          />
          <div className="mt-10 space-y-6">
            {careers.openings.map((job) => (
              <Reveal key={job.title}>
                <article className="glass clip-corner p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold text-slate-900">
                      {job.title}
                    </h3>
                    <div className="flex gap-2">
                      <Chip>{job.location}</Chip>
                      <Chip>{job.type}</Chip>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-8 md:grid-cols-3">
                    <div>
                      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-blue-600">
                        {"// Responsibilities"}
                      </h4>
                      <RevealGroup className="space-y-2.5" stagger={0.05}>
                        {job.responsibilities.map((r) => (
                          <RevealItem key={r} className="flex items-start gap-2.5">
                            <span aria-hidden className="mt-1.5 inline-block h-1 w-1 rotate-45 bg-blue-400" />
                            <span className="text-sm leading-relaxed text-muted">{r}</span>
                          </RevealItem>
                        ))}
                      </RevealGroup>
                    </div>
                    <div>
                      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-blue-600">
                        {"// Beneficial Skills"}
                      </h4>
                      <RevealGroup className="space-y-2.5" stagger={0.05}>
                        {job.beneficialSkills.map((r) => (
                          <RevealItem key={r} className="flex items-start gap-2.5">
                            <span aria-hidden className="mt-1.5 inline-block h-1 w-1 rotate-45 bg-violet-400" />
                            <span className="text-sm leading-relaxed text-muted">{r}</span>
                          </RevealItem>
                        ))}
                      </RevealGroup>
                    </div>
                    <div>
                      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-blue-600">
                        {"// Requirements"}
                      </h4>
                      <RevealGroup className="space-y-2.5" stagger={0.05}>
                        {job.requirements.map((r) => (
                          <RevealItem key={r} className="flex items-start gap-2.5">
                            <span aria-hidden className="mt-1.5 inline-block h-1 w-1 rotate-45 bg-amber-400" />
                            <span className="text-sm leading-relaxed text-muted">{r}</span>
                          </RevealItem>
                        ))}
                      </RevealGroup>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading="Here about equipment instead?"
          blurb="If you landed here looking for a machine rather than a job, an applications engineer can help — tell us what you are automating."
          secondary={{ label: "Browse the catalog", href: "/products" }}
        />
      </div>
    </>
  );
}
