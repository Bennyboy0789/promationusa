"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

/** Number that springs up from 0 when scrolled into view. */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (inView && !reduce) {
      setCounting(true);
      mv.set(value);
    }
  }, [inView, reduce, value, mv]);

  useEffect(() => {
    if (!counting) return;
    const unsub = spring.on("change", (v) => {
      if (ref.current)
        ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
    });
    return unsub;
  }, [counting, spring, prefix, suffix]);

  // Render the real figure, not a zero. The count-up is decoration; the number
  // has to be correct on the server, without JS, and before it scrolls into
  // view — otherwise a label like "Customer satisfaction" reads as "0%".
  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
