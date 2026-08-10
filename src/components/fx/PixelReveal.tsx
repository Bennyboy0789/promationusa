"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Pattern =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "random";

type Cells = { rows: number; cols: number; delays: number[] };

/**
 * Pixel-grid reveal: the parent starts covered by a mosaic of solid cells
 * that disappear with per-cell, distance-based delays, uncovering the
 * content beneath. Runs once on mount, then removes itself from the DOM.
 */
export function PixelReveal({
  pattern = "center",
  cols = 22,
  /** seconds the stagger is spread across */
  spread = 0.9,
  /** seconds before the reveal starts */
  delay = 0.25,
  colors = ["#050b18", "#081226", "#0a1a36"],
  className,
}: {
  pattern?: Pattern;
  cols?: number;
  spread?: number;
  delay?: number;
  colors?: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<Cells | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;

    raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        setDone(true);
        return;
      }
      const cell = rect.width / cols;
      const rows = Math.max(1, Math.ceil(rect.height / cell));

      // precompute every cell's delay (incl. random noise) outside render
      const delays: number[] = new Array(rows * cols);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const nx = cols > 1 ? col / (cols - 1) : 0;
          const ny = rows > 1 ? row / (rows - 1) : 0;
          let t: number;
          switch (pattern) {
            case "top-left":
              t = (nx + ny) / 2;
              break;
            case "top-right":
              t = (1 - nx + ny) / 2;
              break;
            case "bottom-left":
              t = (nx + 1 - ny) / 2;
              break;
            case "bottom-right":
              t = (2 - nx - ny) / 2;
              break;
            case "left":
              t = nx;
              break;
            case "right":
              t = 1 - nx;
              break;
            case "top":
              t = ny;
              break;
            case "bottom":
              t = 1 - ny;
              break;
            case "random":
              t = Math.random();
              break;
            case "center":
            default:
              t = Math.hypot(nx - 0.5, ny - 0.5) / Math.hypot(0.5, 0.5);
          }
          // slight noise so wavefronts don't read as perfect lines
          delays[row * cols + col] = delay + t * spread + Math.random() * 0.08;
        }
      }

      setCells({ rows, cols, delays });
      // unmount after the slowest cell has faded
      doneTimer = setTimeout(
        () => setDone(true),
        (delay + spread + 0.6) * 1000
      );
    });

    return () => {
      cancelAnimationFrame(raf);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, [reduce, cols, spread, delay, pattern]);

  if (reduce || done) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {cells ? (
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${cells.cols}, 1fr)`,
            gridTemplateRows: `repeat(${cells.rows}, 1fr)`,
          }}
        >
          {cells.delays.map((d, i) => {
            const col = i % cells.cols;
            const row = Math.floor(i / cells.cols);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: d, ease: "easeOut" }}
                style={{
                  backgroundColor: colors[(col * 7 + row * 13) % colors.length],
                  // bleed a hair past the cell edge to avoid hairline seams
                  margin: "-0.5px",
                }}
              />
            );
          })}
        </div>
      ) : (
        // solid cover until the grid is measured (also the SSR state),
        // so the content never flashes before the reveal starts
        <div className="h-full w-full" style={{ backgroundColor: colors[0] }} />
      )}
    </div>
  );
}
