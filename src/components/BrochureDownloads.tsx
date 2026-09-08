import type { Brochure } from "@/lib/brochures";

/**
 * Download buttons for the line brochures.
 *
 * Plain anchors with `download` — the files are first-party statics in
 * /public/brochures, so the browser saves them directly. The size sits on the
 * button because the product-line brochure is 8 MB and a phone visitor
 * deserves to know that before tapping.
 */
export function BrochureDownloads({
  items,
  className = "",
}: {
  items: Brochure[];
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((b) => (
        <a
          key={b.href}
          href={b.href}
          download
          className="clip-corner group inline-flex items-center gap-3 border border-blue-400/30 bg-blue-500/[0.06] px-4 py-2.5 transition-colors hover:border-blue-400/60"
        >
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2v8m0 0 3-3m-3 3L5 7" />
            <path d="M2.5 11.5v1.6a.9.9 0 0 0 .9.9h9.2a.9.9 0 0 0 .9-.9v-1.6" />
          </svg>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue-700">
            {b.label}
          </span>
          <span className="font-mono text-[10px] text-muted">PDF · {b.size}</span>
        </a>
      ))}
    </div>
  );
}
