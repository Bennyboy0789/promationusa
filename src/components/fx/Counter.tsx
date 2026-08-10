"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    if (reduce) {
      if (ref.current)
        ref.current.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      return;
    }
    const unsub = spring.on("change", (v) => {
      if (ref.current)
        ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
    });
    return unsub;
  }, [spring, prefix, suffix, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
