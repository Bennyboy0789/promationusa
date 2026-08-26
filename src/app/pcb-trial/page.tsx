import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { RequestQuoteBlock } from "@/components/Conversion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Send Us Your Board — Free Proof of Concept",
  description:
    "Send us your board and our IPC-certified engineers will run it on the machine you are evaluating — results, footage and a quote. No cost, no obligation.",
};

const steps = [
  {
    n: "01",
    title: "Send us your board",
    body: "Ship us the assembly — or the fluid, the fastener, the part you need marked. Tell us the process you're trying to automate.",
  },
  {
    n: "02",
    title: "We run it and film it",
    body: "Our IPC-certified engineers set up the machine you're evaluating, run your actual part, and record the result.",
  },
  {
    n: "03",
    title: "You get the results",
    body: "Cycle times, joint quality, footage of the run, and a quote for the configuration that produced it.",
  },
];

export default function PcbTrialPage() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Free proof-of-concept request"
  )}&body=${encodeURIComponent(
    "Hello PROMATION USA,\n\nI'd like to submit a part for a free proof of concept.\n\n  Company:\n  Process to automate (soldering / dispensing / screw driving / laser marking):\n  Part or board description:\n  Volumes:\n  Timeline:\n\n"
  )}`;

  return (
    <>
      <PageHero
        eyebrow="Proof of Concept"
        title="Send us your board — we'll prove it out for free"
        intro="Before you commit to a machine, see it run your actual part. No cost, no obligation."
        crumbs={[{ label: "Home", href: "/" }, { label: "Free trial" }]}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, about a week"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="glass clip-corner flex h-full flex-col gap-3 p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600/70">
                  {s.n}
                </span>
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass clip-corner mt-12 p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">
              What to tell us
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              The more we know about the process, the more useful the trial —
              board or part description, the joints or features involved,
              expected volumes and your timeline. Files and photos help but
              aren&apos;t required to start.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={mailto}
                className="clip-corner border border-blue-400/50 bg-blue-500/10 px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-700 transition-colors hover:bg-blue-500/20"
              >
                Request a free trial
              </a>
              <a
                href={`tel:+1${site.phone.replace(/\D/g, "")}`}
                className="clip-corner border border-blue-400/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50"
              >
                Or call {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="pb-20">
        <RequestQuoteBlock heading="Ready for pricing instead?" />
      </div>
    </>
  );
}
