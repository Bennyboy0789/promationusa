"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { StoreItem } from "@/lib/store";

export function StoreCatalog({
  items,
  categories,
}: {
  items: StoreItem[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? items
      : items.filter((p) => (p.categories ?? []).includes(active));

  return (
    <div>
      {/* category filter */}
      <div className="flex flex-wrap gap-2.5">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
              active === c
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-line bg-surface-light/60 text-muted hover:border-blue-400/60 hover:text-blue-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {filtered.length} {filtered.length === 1 ? "part" : "parts"} in stock
        catalog
      </p>

      {/* grid */}
      <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href={`/store/${p.slug}`}
                className="glass clip-corner group flex h-full flex-col transition-colors hover:border-blue-400/40"
              >
                {p.images?.[0]?.src && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                    <Image
                      src={p.images[0].src}
                      alt={p.images[0].alt ?? p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <h3 className="font-display text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
                    {p.name}
                  </h3>
                  {p.categories && p.categories.length > 0 && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                      {p.categories[0]}
                    </span>
                  )}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-blue-600">
                      {p.price ?? "Call for price"}
                    </span>
                    <span
                      aria-hidden
                      className="font-mono text-blue-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
