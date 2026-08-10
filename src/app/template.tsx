"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Page-enter transition: soft rise + de-blur on every route change. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.21, 0.68, 0.19, 1] }}
    >
      {children}
    </motion.div>
  );
}
