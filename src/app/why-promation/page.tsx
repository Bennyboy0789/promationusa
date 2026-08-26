import Link from "next/link";
import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { RequestQuoteBlock } from "@/components/Conversion";

export const metadata: Metadata = {
  title: "Why PROMATION — Official North American Source",
  description:
    "The official North American source for QUICK, PANDA, TechMan and SEAMARK automation — machines held in US stock and supported by IPC-certified engineers.",
};

const proof = [
  {
    title: "Official North American source",
    body: "Authorized for QUICK, PANDA, TechMan and SEAMARK — buying here is buying from the brands' own channel, with the warranty and support that comes with it.",
  },
  {
    title: "Machines in US stock",
    body: "Equipment and spares held in domestic inventory, so lead times aren't tied to an overseas shipping schedule.",
  },
  {
    title: "IPC-certified engineers",
    body: "The people who set up your process hold the certifications the process is judged against — and they'll run your part before you buy.",
  },
  {
    title: "Support in your time zone",
    body: "Applications help, spare parts and service handled from the US, without a cross-border delay on every question.",
  },
];

export default function WhyPromationPage() {
  return (
    <>
      <PageHero
        eyebrow="Why PROMATION"
        title="The official North American source for QUICK, PANDA & TechMan"
        intro="Same machines, backed by domestic stock, certified engineers and support that answers in your working day."
        crumbs={[{ label: "Home", href: "/" }, { label: "Why PROMATION" }]}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {proof.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="glass clip-corner flex h-full flex-col gap-3 p-7">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  {p.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Buying imported equipment"
            title="The questions worth asking any supplier"
          />
          <Reveal>
            <div className="glass clip-corner mt-8 p-8">
              <dl className="grid gap-7 md:grid-cols-3">
                <div>
                  <dt className="font-display text-base font-semibold text-slate-900">
                    Who holds the stock?
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    Machines and spares sit in US inventory here, not on a
                    vessel.
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-base font-semibold text-slate-900">
                    Who answers the phone?
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    A US applications engineer who has run the machine you
                    bought.
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-base font-semibold text-slate-900">
                    Can you try before you buy?
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    Send your board and we&apos;ll run it —{" "}
                    <Link
                      href="/pcb-trial"
                      className="text-blue-600 underline-offset-4 hover:underline"
                    >
                      free proof of concept
                    </Link>
                    .
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Recognition"
            title="Award-winning equipment"
          />
          <Reveal>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              The PANDA line was recognised in the 2025 TITAN Innovation Awards,
              following earlier NPI recognition — independent confirmation of
              what the machines do on a production floor.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading="Talk to the people who support the machine"
          secondary={{ label: "Send us your board", href: "/pcb-trial" }}
        />
      </div>
    </>
  );
}
