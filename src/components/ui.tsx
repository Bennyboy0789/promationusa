import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { DecodeText } from "@/components/fx/DecodeText";

/** Eyebrow label + big display heading used to open every section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  decode = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  decode?: boolean;
}) {
  const alignCls = align === "center" ? "text-center items-center" : "";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls}`}>
      <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping-soft" />
        {eyebrow}
      </span>
      {decode ? (
        <DecodeText
          as="h2"
          text={title}
          className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        />
      ) : (
        <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      )}
      {intro && (
        <p className={`max-w-2xl text-base leading-relaxed text-muted ${align === "center" ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}

/** Primary CTA — angled corners, neon sweep on hover. */
export function GlowButton({
  href,
  children,
  variant = "primary",
  external,
  cta,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  /** Tracking label, surfaced to analytics as `data-cta`. */
  cta?: string;
}) {
  const base =
    "group relative inline-flex items-center gap-2 overflow-hidden px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 clip-corner";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-500"
      : "border border-blue-400/30 text-blue-600 hover:border-blue-400/70 hover:text-slate-900 bg-blue-400/5";
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={`${base} ${styles}`} data-cta={cta} {...props}>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

/** Small mono tag chip. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line bg-surface-light/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
      {children}
    </span>
  );
}

/** Interior page hero with blueprint grid + breadcrumb. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  aside,
  asideAlign = "end",
  background,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: { label: string; href?: string }[];
  /** Optional figure held to the right of the hero copy (desktop only). */
  aside?: ReactNode;
  /**
   * How the aside sits against the hero copy. A cut-out portrait wants to
   * stand on the bottom edge ("end"); a card or form reads better centred,
   * which also stops a tall aside leaving dead space above the headline.
   */
  asideAlign?: "end" | "center";
  /** Optional photograph behind the whole hero, washed out for legibility. */
  background?: { src: string; overlay?: string };
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-16 pt-20">
      {background && (
        <div aria-hidden className="absolute inset-0">
          <Image
            src={background.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className={`absolute inset-0 ${
              background.overlay ??
              "bg-gradient-to-r from-[var(--background)] via-[var(--background)]/88 to-[var(--background)]/55"
            }`}
          />
        </div>
      )}
      <div className="grid-bg grid-fade absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={
            aside
              ? `grid gap-8 lg:grid-cols-[1fr_auto] ${
                  asideAlign === "center" ? "items-center" : "items-end"
                }`
              : undefined
          }
        >
        <div className="min-w-0">
        {crumbs && crumbs.length > 0 && (
          <Reveal direction="down" duration={0.5}>
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-blue-600/50">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-blue-600">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-blue-600">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}
        <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping-soft" />
          {eyebrow}
        </span>
        <DecodeText
          as="h1"
          text={title}
          className="block max-w-4xl font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        />
        {intro && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
          </Reveal>
        )}
        </div>
        {aside && <div className="relative">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
