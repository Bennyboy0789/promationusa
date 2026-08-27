"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { search, type SearchKind } from "@/lib/searchIndex";

const KIND_LABEL: Record<SearchKind, string> = {
  model: "Machine",
  category: "Category",
  part: "Part",
  article: "News",
  page: "Page",
};

/**
 * Site search over the pre-built index.
 *
 * The URL is the source of truth for the query — `?q=` — so a result set can be
 * linked, bookmarked and reached from an external search engine. Typing updates
 * the URL with `replace` so the back button steps out of search rather than
 * back through every keystroke.
 */
export function SiteSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);

  useEffect(() => {
    const id = setTimeout(() => {
      const next = q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search";
      router.replace(next, { scroll: false });
    }, 250);
    return () => clearTimeout(id);
  }, [q, router]);

  const results = useMemo(() => search(q), [q]);
  const grouped = useMemo(() => {
    const g: Partial<Record<SearchKind, typeof results>> = {};
    for (const r of results) (g[r.kind] ??= []).push(r);
    return g;
  }, [results]);

  const order: SearchKind[] = ["model", "category", "part", "article", "page"];

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="glass clip-corner p-6 sm:p-7"
      >
        {/* With no query there are no result headings, which left the document
            outline jumping from the h1 straight to the footer h3s. */}
        <h2 className="sr-only">Search the catalogue</h2>
        <label
          htmlFor="site-search"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
        >
          Search machines, parts and model numbers
        </label>
        <input
          id="site-search"
          type="search"
          value={q}
          autoFocus
          autoComplete="off"
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. 9434, screw driving, conveyor, solder tip"
          className="w-full border border-line bg-white px-4 py-3 text-base text-slate-900 outline-none transition-colors placeholder:text-muted focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <p aria-live="polite" className="mt-3 text-sm text-muted">
          {q.trim().length < 2
            ? "Type at least two characters."
            : `${results.length} result${results.length === 1 ? "" : "s"} for “${q.trim()}”`}
        </p>
      </form>

      {results.length === 0 && q.trim().length >= 2 && (
        <div className="glass clip-corner mt-6 p-7">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Nothing matched that.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Model numbers, categories, part names and SKUs are all searchable. If
            you are looking for a machine we have not listed, tell us the process
            and we will find it —{" "}
            <Link href="/contact" className="text-blue-600 underline-offset-4 hover:underline">
              ask an applications engineer
            </Link>
            .
          </p>
        </div>
      )}

      <div className="mt-8 space-y-10">
        {order.map((kind) => {
          const items = grouped[kind];
          if (!items || items.length === 0) return null;
          return (
            <section key={kind}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-blue-600">
                {KIND_LABEL[kind]}
                <span className="ml-2 text-muted">{items.length}</span>
              </h2>
              <ul className="mt-4 divide-y divide-line border-t border-line">
                {items.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="group flex flex-col gap-1 py-4 transition-colors hover:bg-blue-500/[0.04]"
                    >
                      <span className="font-display text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                        {r.title}
                      </span>
                      <span className="text-sm text-muted">{r.context}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
