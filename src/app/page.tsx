import Link from "next/link";
import { CinematicHero } from "@/components/fx/CinematicHero";
import { DecodeText } from "@/components/fx/DecodeText";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { Counter } from "@/components/fx/Counter";
import { Marquee } from "@/components/fx/Marquee";
import { SectionHeading, GlowButton, Chip } from "@/components/ui";
import { partners, homeVideo, whatWeDo } from "@/lib/content";
import { articles, formatDate } from "@/lib/news";

const divisions = [
  {
    index: "01",
    title: "PCB Handling",
    href: "/pcb-handling",
    blurb:
      "Loaders, unloaders, conveyors, buffers, turners and inspection stations — the complete SMEMA-compliant board-flow platform.",
    tags: ["Conveyors", "Loaders", "Buffering"],
  },
  {
    index: "02",
    title: "Robotic Soldering",
    href: "/robotic-soldering-glance",
    blurb:
      "QUICK and PANDA intelligent soldering robots — batch and in-line selective soldering with hot air, molten drop and hot bar.",
    tags: ["QUICK", "PANDA", "In-Line"],
  },
  {
    index: "03",
    title: "Robotic Dispensing",
    href: "/auto-dispensing-at-a-glance",
    blurb:
      "High-precision automated dispensing platforms for adhesives, coatings and solder paste across the ET and QS series.",
    tags: ["ET Series", "Precision", "Coating"],
  },
  {
    index: "04",
    title: "Robotic Screw Driving",
    href: "/auto-screw-driving-at-a-glance",
    blurb:
      "Automated screw-feeding and driving robots engineered for repeatable, torque-controlled assembly.",
    tags: ["Auto-Feed", "Torque Control"],
  },
  {
    index: "05",
    title: "Laser Marking",
    href: "/laser-marking-at-a-glance",
    blurb:
      "PANDA Robotics laser marking systems — permanent, high-contrast PCB traceability, awarded for innovation.",
    tags: ["PANDA", "Traceability"],
  },
  {
    index: "06",
    title: "TechMan Cobots",
    href: "/tm-robots-at-a-glance",
    blurb:
      "TechMan collaborative robots with built-in vision — TM5 to TM20 payload classes for flexible automation.",
    tags: ["TM Series", "Vision", "Cobots"],
  },
  {
    index: "07",
    title: "Mobile Robots & X-Ray",
    href: "/intelligent-mobile-robot-solutions",
    blurb:
      "OMRON autonomous mobile robots for line loading plus SEAMARK X-ray inspection for hidden-joint quality.",
    tags: ["AMR", "SEAMARK", "Inspection"],
  },
];

const stats = [
  { value: 20, suffix: "+", label: "Years of Experience" },
  { value: 120, suffix: "+", label: "Automation Products" },
  { value: 38, suffix: "", label: "Soldering Robot Models" },
  { value: 4, suffix: "", label: "Regions Served" },
];

export default function Home() {
  const latest = articles.slice(0, 3);

  return (
    <>
      {/* ================= HERO ================= */}
      <CinematicHero />

      {/* ================= STATS BAND ================= */}
      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealGroup className="grid grid-cols-2 divide-x divide-line sm:grid-cols-4">
            {stats.map((s) => (
              <RevealItem key={s.label} className="px-6 py-8">
                <div className="font-display text-3xl font-bold text-blue-600 sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ================= DIVISIONS ================= */}
      <section className="relative mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Product Divisions"
          title="Seven systems. One automated line."
          intro="Every division of the PROMATION platform is engineered to slot into your production line — from bare-board loading to final inspection."
          decode
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {divisions.map((d, i) => (
            <Reveal key={d.href} delay={(i % 3) * 0.08}>
              <TiltCard className="group relative h-full">
                <Link
                  href={d.href}
                  className="glass clip-corner relative flex h-full flex-col gap-4 p-7 transition-colors duration-300 hover:border-blue-400/40"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-blue-600/60">
                      [{d.index}]
                    </span>
                    <span
                      aria-hidden
                      className="font-mono text-blue-600/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
                    >
                      ↗
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-slate-900 transition-colors group-hover:text-blue-500">
                    {d.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted">{d.blurb}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="relative overflow-hidden border-y border-line py-28">
        <div className="grid-bg grid-fade absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="What We Do"
              title="World-class automation, human-grade service."
              intro={whatWeDo.intro}
            />
            <Reveal delay={0.2}>
              <div className="mt-8">
                <GlowButton href="/what-we-do" variant="ghost">
                  About PROMATION
                </GlowButton>
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={0.15}>
            <figure className="border-beam clip-corner relative h-full p-8 lg:p-10">
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
      </section>

      {/* ================= VIDEO ================= */}
      <section className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="See It Run"
          title="Automation in motion"
          intro="Watch the PROMATION platform at work — then book a live virtual demo with our engineers."
          align="center"
        />
        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="border-beam clip-corner p-1.5">
              <div className="clip-corner relative aspect-video overflow-hidden bg-black">
                <iframe
                  src={homeVideo}
                  title="PROMATION USA — automation in motion"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= LATEST NEWS ================= */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Transmission Log"
            title="Latest press releases"
          />
          <Reveal delay={0.1}>
            <GlowButton href="/news" variant="ghost">
              All News
            </GlowButton>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {latest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <Link
                href={`/news/${a.path}`}
                className="glass clip-corner group flex h-full flex-col gap-4 p-7 transition-colors hover:border-blue-400/40"
              >
                <time className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600/70">
                  {formatDate(a.date)}
                </time>
                <h3 className="font-display text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
                  {a.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                  {a.excerpt}
                </p>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600/70 transition-colors group-hover:text-blue-600">
                  Read Transmission →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= PARTNERS MARQUEE ================= */}
      <section className="border-y border-line py-16">
        <div className="mx-auto mb-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Alliance Network"
            title="Trusted technology partners"
            align="center"
          />
        </div>
        <Marquee duration={45}>
          {partners.map((p) => (
            <span
              key={p.name}
              className="font-display text-2xl font-semibold tracking-tight text-muted/50 transition-colors hover:text-blue-600"
            >
              {p.name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="glass clip-corner relative overflow-hidden p-10 text-center sm:p-16">
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[100px]"
          />
          <div className="relative">
            <DecodeText
              as="h2"
              text="READY TO AUTOMATE?"
              className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            />
            <p className="mx-auto mt-5 max-w-xl text-muted">
              Speak with our award-winning team about your production line —
              serving the USA, Mexico, Canada and Europe from Kenosha, Wisconsin.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <GlowButton href="/contact">Contact Us Today</GlowButton>
              <GlowButton href="/store" variant="ghost">
                Order Parts Online
              </GlowButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
