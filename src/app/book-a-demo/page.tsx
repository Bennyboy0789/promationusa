import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { QuickRfq } from "@/components/QuickRfq";
import { CtaBar, RequestQuoteBlock, TrustStrip } from "@/components/Conversion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Demo — See the Machine Run",
  description:
    "Book a live video session with a PROMATION USA applications engineer, or visit the Kenosha lab. See the machine run your part before you buy.",
};

/**
 * Demo booking.
 *
 * The old site advertised a "Virtual Video Session" as plain text with nothing
 * to click, which the audit recorded as a conversion asset that existed but was
 * never wired up. This is the wiring.
 *
 * It deliberately does not embed a third-party scheduler: PROMATION has no
 * booking tool we have been given, and a fake calendar that drops requests is
 * worse than an honest form. When a scheduler exists, it replaces the form here
 * and nothing else on the page changes.
 */

const formats = [
  {
    n: "01",
    title: "Live video session",
    body: "A scheduled call with an applications engineer, camera on the machine. You direct it — ask for the joint, the cycle, the changeover.",
    time: "30–45 minutes",
  },
  {
    n: "02",
    title: "Your part, on camera",
    body: "Send the board or the part first and we will run it during the session, so what you are watching is your own process rather than a demo piece.",
    time: "Allow a week for shipping",
  },
  {
    n: "03",
    title: "In person, Kenosha",
    body: "Visit the lab and stand next to the machine. Useful when several people need to see it, or when the decision involves changeover and ergonomics.",
    time: "Half a day",
  },
];

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Demo"
        title="See the machine run before you buy"
        intro="Book a live video session with an applications engineer, or come to the lab. Either way you watch the actual process, not a slide deck."
        crumbs={[{ label: "Home", href: "/" }, { label: "Book a demo" }]}
        aside={
          <QuickRfq
            heading="Book a session"
            blurb="Tell us what you want to see. We will reply with times, usually within one business day."
            source="/book-a-demo"
          />
        }
        asideAlign="center"
      />

      <CtaBar
        label="Prefer to talk it through?"
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "Send us your board", href: "/pcb-trial" }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Formats"
          title="Three ways to see it"
          intro="All three are free and none of them require a purchase order."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {formats.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.08}>
              <div className="glass clip-corner flex h-full flex-col gap-3 p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600/70">
                  {f.n}
                </span>
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{f.body}</p>
                <span className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/80">
                  {f.time}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass clip-corner mt-12 p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">
              What to tell us when you book
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              The process you are automating, the part or board, rough volumes,
              and who else needs to be on the call. If you already have a model
              in mind, name it — if you do not, that is what the session is for.
            </p>
            <TrustStrip className="mt-7" />
            <p className="mt-6 text-sm text-muted">
              Prefer the phone?{" "}
              <a
                href={`tel:+1${site.phone.replace(/\D/g, "")}`}
                className="font-semibold text-blue-600 underline-offset-4 hover:underline"
              >
                {site.phone}
              </a>{" "}
              — Mon–Fri, 8AM–5PM CST.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading="Rather skip ahead to pricing?"
          blurb="If you already know the machine, we can send configuration and price range without the session."
          secondary={{ label: "Send us your board", href: "/pcb-trial" }}
        />
      </div>
    </>
  );
}
