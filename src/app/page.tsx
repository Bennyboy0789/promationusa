import Image from "next/image";
import Link from "next/link";
import { LineupHero } from "@/components/fx/LineupHero";
import { DecodeText } from "@/components/fx/DecodeText";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { Counter } from "@/components/fx/Counter";
import { Marquee } from "@/components/fx/Marquee";
import { ParallaxBand } from "@/components/fx/ParallaxBand";
import { QuotePortrait } from "@/components/QuotePortrait";
import { SectionHeading, GlowButton, Chip } from "@/components/ui";
import { partners, homeVideo, whatWeDo } from "@/lib/content";
import { articles, formatDate } from "@/lib/news";

const divisions = [
  {
    index: "01",
    title: "PCB Handling",
    href: "/pcb-handling",
    image: "/images/pcb-handling-photo.webp",
    blurb:
      "Loaders, unloaders, conveyors, buffers, turners and inspection stations — the complete SMEMA-compliant board-flow platform.",
    tags: ["Conveyors", "Loaders", "Buffering"],
  },
  {
    index: "02",
    title: "Robotic Soldering",
    href: "/robotic-soldering",
    image: "/images/soldering-photo.webp",
    blurb:
      "QUICK and PANDA intelligent soldering robots — batch and in-line selective soldering with hot air, molten drop and hot bar.",
    tags: ["QUICK", "PANDA", "In-Line"],
  },
  {
    index: "03",
    title: "Robotic Dispensing",
    href: "/robotic-dispensing",
    image: "/images/dispensing-photo.webp",
    blurb:
      "High-precision automated dispensing platforms for adhesives, coatings and solder paste across the ET and QS series.",
    tags: ["ET Series", "Precision", "Coating"],
  },
  {
    index: "04",
    title: "Robotic Screw Driving",
    href: "/robotic-screw-driving",
    image: "",
    blurb:
      "Automated screw-feeding and driving robots engineered for repeatable, torque-controlled assembly.",
    tags: ["Auto-Feed", "Torque Control"],
  },
  {
    index: "05",
    title: "Laser Marking",
    href: "/laser-marking",
    image: "/images/laser-photo.webp",
    blurb:
      "PANDA Robotics laser marking systems — permanent, high-contrast PCB traceability, awarded for innovation.",
    tags: ["PANDA", "Traceability"],
  },
  {
    index: "06",
    title: "TechMan Cobots",
    href: "/collaborative-robots",
    image: "/images/cobots-photo.webp",
    blurb:
      "TechMan collaborative robots with built-in vision — TM5 to TM20 payload classes for flexible automation.",
    tags: ["TM Series", "Vision", "Cobots"],
  },
  {
    index: "07",
    title: "Mobile Robots & X-Ray",
    href: "/mobile-robots",
    image: "/images/mobile-robot-photo.webp",
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
      <LineupHero />

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
                  <div className="relative -mx-7 -mt-7 mb-3 h-40 overflow-hidden bg-[#0d1b2e]">
                    {d.image ? (
                      <Image
                        src={d.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="grid-bg absolute inset-0 flex items-center justify-center opacity-90"
                      >
                        <span className="font-display text-2xl font-bold tracking-tight text-white/25">
                          {d.title}
                        </span>
                      </div>
                    )}
                  </div>
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

      {/* ================= PARALLAX — THE MACHINE ================= */}
      <ParallaxBand
        src="/images/hq.webp"
        alt="A PANDA robotic soldering cell on the floor at PROMATION USA"
        height="min-h-[64vh]"
        overlay="bg-gradient-to-r from-[#050d1a]/92 via-[#050d1a]/70 to-[#050d1a]/35"
      >
        <div className="max-w-xl text-white">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-300">
            Recognised engineering
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            The PANDA line — three golds at the 2025 TITAN Innovation Awards
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            Designed and engineered in the USA, the PANDA series brings vision
            alignment, network connectivity and remote support to robotic
            soldering and laser marking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/laser-marking/panda-robotics-usa"
              className="clip-corner bg-blue-600 px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-blue-500"
            >
              Explore PANDA
            </Link>
            <Link
              href="/pcb-trial"
              className="clip-corner border border-white/25 bg-white/[0.04] px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:border-sky-300/70"
            >
              Send us your board
            </Link>
          </div>
        </div>
      </ParallaxBand>

      {/* ================= MISSION ================= */}
      <section className="relative overflow-hidden border-y border-line py-28">
        <div className="grid-bg grid-fade absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="What We Do"
              title="The questions worth asking any supplier."
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
            <div className="flex h-full flex-col">
              <QuotePortrait
                src={whatWeDo.quote.portrait}
                name={whatWeDo.quote.author}
                role={whatWeDo.quote.role}
              />
              <figure className="border-beam clip-corner relative flex-1 p-8 lg:p-10">
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
            </div>
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

      {/* ================= PARALLAX — THE LINE ================= */}
      <ParallaxBand
        src="/images/laser-photo.webp"
        alt="PCB panels under a PANDA laser marking head"
        height="min-h-[46vh]"
        overlay="bg-[#050d1a]/84"
        speed={0.32}
      >
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            From bare-board loading to final inspection — one connected line
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Every PROMATION system is built to slot into the line you already
            run, with the handoffs, footprints and interfaces worked out before
            it ships.
          </p>
        </div>
      </ParallaxBand>

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
              Talk to an applications engineer about your production line —
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
