"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * A full-bleed image band whose background drifts slower than the page.
 *
 * The image is over-sized by the same margin it travels, so no matter where the
 * band sits in the scroll it never reveals an edge. Motion is dropped entirely
 * for readers who ask for reduced motion — the photograph simply holds still.
 */
export function ParallaxBand({
  src,
  alt,
  children,
  height = "min-h-[62vh]",
  overlay = "bg-[#050d1a]/72",
  focal = "object-center",
  speed = 0.38,
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
  height?: string;
  overlay?: string;
  focal?: string;
  /**
   * Fraction of the band's height the image travels.
   *
   * The image is oversized by `speed` above and below, and moves by
   * `speed/2 × its own height`. Those stay balanced only while `speed <= 0.5`;
   * past that the image travels further than its overhang and an edge appears.
   */
  speed?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = Math.round(speed * 100);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`-${travel / 2}%`, `${travel / 2}%`]
  );

  return (
    <section
      ref={ref}
      className={`relative isolate flex w-full items-center overflow-hidden ${height}`}
    >
      <motion.div
        aria-hidden
        style={{ y, top: `-${travel}%`, bottom: `-${travel}%` }}
        className="absolute inset-x-0 will-change-transform"
      >
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className={`object-cover ${focal}`}
          />
        </div>
      </motion.div>

      <div aria-hidden className={`absolute inset-0 ${overlay}`} />
      {children && (
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {children}
        </div>
      )}
    </section>
  );
}
