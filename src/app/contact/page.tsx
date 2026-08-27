import type { Metadata } from "next";
import { PageHero, SectionHeading, GlowButton } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { DecodeText } from "@/components/fx/DecodeText";
import { contactPage } from "@/lib/content";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { QuickRfq } from "@/components/QuickRfq";
import { TrustStrip } from "@/components/Conversion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact PROMATION USA — 9900 58th Place Suite #100, Kenosha WI 53144 — 262.764.4832 — sales@promationusa.com.",
};

export default function ContactPage() {
  const phoneHref = `tel:+1${site.phone.replace(/\./g, "")}`;

  return (
    <>
      <PageHero
        eyebrow="Direct Line"
        title={contactPage.headline}
        intro={contactPage.sub}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        aside={<QuickRfq source="/contact" />}
        asideAlign="center"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Phone */}
          <Reveal>
            <a
              href={phoneHref}
              className="border-beam clip-corner group block h-full p-8 transition-colors"
            >
              <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
                {"// Voice Channel"}
              </h2>
              <DecodeText
                text={site.phone}
                className="mt-4 block font-display text-3xl font-bold text-slate-900 transition-colors group-hover:text-blue-500"
              />
              <p className="mt-3 text-sm text-muted">
                Speak to an applications engineer who has run the machine.
              </p>
            </a>
          </Reveal>

          {/* Email */}
          <Reveal delay={0.08}>
            <a
              href={`mailto:${site.email}`}
              className="border-beam clip-corner group block h-full p-8"
            >
              <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
                {"// Data Channel"}
              </h2>
              <DecodeText
                text={site.email}
                className="mt-4 block break-all font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-500"
              />
              <p className="mt-3 text-sm text-muted">
                Quotes, spec sheets and integration questions — one business day
                response.
              </p>
            </a>
          </Reveal>

          {/* HQ */}
          <Reveal delay={0.16}>
            <div className="glass clip-corner h-full p-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
                {"// Coordinates"}
              </h2>
              <address className="mt-4 text-lg not-italic leading-relaxed text-foreground/90">
                PROMATION INC. USA
                <br />
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </address>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                North American Headquarters
              </p>
            </div>
          </Reveal>
        </div>

        {/* Hours + coverage */}
        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Operating Window" title="Business hours" />
            <RevealGroup className="mt-8 space-y-3">
              {contactPage.hours.map((h) => (
                <RevealItem
                  key={h.days}
                  className="glass clip-corner flex items-center justify-between p-5"
                >
                  <span className="font-display text-sm font-semibold text-slate-900">
                    {h.days}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">
                    {h.hours}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div>
            <SectionHeading
              eyebrow="Coverage Zone"
              title="Proudly serving"
              intro="North American operations served from the Kenosha, WI headquarters — extending across four regions."
            />
            <RevealGroup className="mt-8 grid grid-cols-2 gap-3">
              {contactPage.serves.map((region, i) => (
                <RevealItem
                  key={region}
                  className="glass clip-corner flex items-center gap-3 p-5"
                >
                  <span className="font-mono text-[10px] text-blue-600/60">
                    R{i + 1}
                  </span>
                  <span className="font-display text-lg font-semibold text-slate-900">
                    {region}
                  </span>
                  <span className="ml-auto inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping-soft" />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading
            eyebrow="Request Information"
            title="Tell us what you need"
            intro="Send us the details and an applications engineer will come back to you — usually within one business day."
            align="center"
          />
          <TrustStrip className="mt-8 justify-center" />
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-3xl">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
