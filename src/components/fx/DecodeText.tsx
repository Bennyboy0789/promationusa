"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>/\\|=+*";

/**
 * Terminal-style text decode: characters scramble then lock in
 * left-to-right when the element scrolls into view.
 *
 * The real text is always in the DOM and always occupies the layout. That is
 * not cosmetic:
 *
 *  - This renders the `<h1>` on most pages. Emitting the scramble (or an empty
 *    node) server-side meant every page shipped a blank heading to crawlers,
 *    with the real words only in `aria-label`.
 *  - Scrambled glyphs are not the same width as the real ones, so animating the
 *    text in the flow re-wrapped the heading and shunted the page below it —
 *    measured at 0.417 CLS on a mobile product page, well past the 0.1 budget.
 *
 * So the real text holds the box and the scramble is painted over it, absolutely
 * positioned, where it cannot affect a single line break.
 */
export function DecodeText({
  text,
  className,
  speed = 28,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  /** ms per decode step */
  speed?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [scramble, setScramble] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || reduce) return;
    let locked = 0;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      // lock one more character every other frame
      if (frame % 2 === 0) locked++;
      if (locked >= text.length) {
        setScramble(null);
        clearInterval(id);
        return;
      }
      setScramble(
        text
          .split("")
          .map((ch, i) => {
            if (i < locked || ch === " ") return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed, reduce]);

  const animating = scramble !== null;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`relative ${className ?? ""}`} aria-label={text}>
      <span className={animating ? "invisible" : undefined}>{text}</span>
      {animating && (
        <span aria-hidden className="absolute inset-0">
          {scramble}
        </span>
      )}
    </Tag>
  );
}
