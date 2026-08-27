"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/products";

/**
 * Product photography, lead shot plus thumbnails.
 *
 * The photographs come from the old site and were never shot to a common
 * spec — some are square studio shots at 2448px, others are wide floor shots.
 * The frame therefore holds a fixed aspect ratio and lets `object-contain`
 * letterbox whatever it is given, rather than cropping into a machine and
 * cutting off the part that identifies it.
 *
 * With one image the thumbnail strip is omitted entirely.
 */
export function ProductGallery({
  images,
  alt,
}: {
  images: ProductImage[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;

  const current = images[active] ?? images[0];

  return (
    <figure className="not-prose">
      <div className="glass clip-corner relative aspect-[4/3] w-full overflow-hidden">
        <Image
          key={current.src}
          src={current.src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 830px"
          className="object-contain p-3"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`clip-corner relative h-20 w-20 overflow-hidden border transition-colors ${
                i === active
                  ? "border-blue-500"
                  : "border-line hover:border-blue-400/50"
              }`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}
