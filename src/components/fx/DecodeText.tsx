"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>/\\|=+*";

/**
 * Terminal-style text decode: characters scramble then lock in
 * left-to-right when the element scrolls into view.
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
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!inView || reduce) return;
    let locked = 0;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      // lock one more character every other frame
      if (frame % 2 === 0) locked++;
      if (locked >= text.length) {
        setDisplay(text);
        clearInterval(id);
        return;
      }
      const scrambled = text
        .split("")
        .map((ch, i) => {
          if (i < locked || ch === " ") return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setDisplay(scrambled);
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed, reduce]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} aria-label={text}>
      {reduce ? text : display || " "}
    </Tag>
  );
}
