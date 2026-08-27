import Link from "next/link";
import { GlowButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="grid-bg grid-fade absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
          {"// Signal Lost"}
        </p>
        <h1 className="mt-4 font-display text-7xl font-bold tracking-tight text-slate-900 sm:text-8xl">
          4<span className="text-blue-600 text-glow">0</span>4
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted">
          The coordinates you entered don&apos;t match any system in the
          PROMATION network. Recalibrate and try again.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlowButton href="/">Return to Base</GlowButton>
          <GlowButton href="/products" variant="ghost">
            Browse Products
          </GlowButton>
        </div>
        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Error code: PAGE_NOT_FOUND —{" "}
          <Link href="/contact" className="text-blue-600 hover:text-blue-600">
            report a broken link
          </Link>
        </p>
      </div>
    </section>
  );
}
