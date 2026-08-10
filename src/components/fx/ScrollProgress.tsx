"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin neon progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-blue-400 via-violet-500 to-amber-400"
      style={{ scaleX }}
    />
  );
}
