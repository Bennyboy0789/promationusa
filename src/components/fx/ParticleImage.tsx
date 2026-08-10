"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Renders an image as a field of particles on canvas.
 *
 * On mount the particles fly in from random positions and assemble into the
 * photo. Moving the cursor through the field scatters particles — they get
 * flung along the cursor's direction of travel with a chaotic tumble, drift,
 * and slowly float back home, leaving a lingering wake.
 */
export function ParticleImage({
  src,
  className,
  fit = "contain",
  gap = 5,
  repelRadius = 110,
  repelStrength = 3.6,
}: {
  src: string;
  className?: string;
  /** contain = letterboxed inside the box; cover = fills the box, cropping the image */
  fit?: "contain" | "cover";
  /** canvas px between particle centers (lower = denser = slower) */
  gap?: number;
  repelRadius?: number;
  repelStrength?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: {
      x: Float32Array;
      y: Float32Array;
      vx: Float32Array;
      vy: Float32Array;
      hx: Float32Array;
      hy: Float32Array;
      colors: string[];
      count: number;
      size: number;
    } | null = null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999 };
    const img = new Image();
    img.src = src;

    /** true for pixels that belong to the old banner template's blue
     *  corner wedges — they get no particle. nx/ny are normalized
     *  coordinates in the SOURCE image. */
    const isTemplateWedge = (
      nx: number,
      ny: number,
      r: number,
      g: number,
      b: number
    ) => {
      const bluish = b > 110 && b - r > 35;
      if (!bluish) return false;
      // bottom-left wedge: below the line (0, .52) → (.42, 1)
      if (nx < 0.45 && ny > 0.52 + (nx / 0.42) * 0.48) return true;
      // bottom-right wedge
      if (nx > 0.78 && ny > 0.8 && ny > 1 - (nx - 0.82) / 0.18) return true;
      // slim left-edge sliver
      if (nx < 0.025) return true;
      return false;
    };

    const build = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h || !img.naturalWidth) return;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // region of the image to show, and where the grid lives on canvas
      let sx = 0,
        sy = 0,
        sW = iw,
        sH = ih,
        offX = 0,
        offY = 0,
        gridW = w,
        gridH = h;

      if (fit === "cover") {
        // crop the image to the container's aspect ratio
        const scale = Math.max(w / iw, h / ih);
        sW = w / scale;
        sH = h / scale;
        sx = (iw - sW) / 2;
        sy = (ih - sH) / 2;
      } else {
        // letterbox inside the container
        const scale = Math.min(w / iw, h / ih);
        gridW = iw * scale;
        gridH = ih * scale;
        offX = (w - gridW) / 2;
        offY = (h - gridH) / 2;
      }

      const cols = Math.max(1, Math.floor(gridW / gap));
      const rows = Math.max(1, Math.floor(gridH / gap));

      // sample the visible image region at particle resolution
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d");
      if (!sctx) return;
      sctx.drawImage(img, sx, sy, sW, sH, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;

      const max = cols * rows;
      const x = new Float32Array(max);
      const y = new Float32Array(max);
      const vx = new Float32Array(max);
      const vy = new Float32Array(max);
      const hx = new Float32Array(max);
      const hy = new Float32Array(max);
      const colors: string[] = [];
      let count = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = (row * cols + col) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 40) continue;
          // normalized position within the source image
          const nx = (sx + (col / cols) * sW) / iw;
          const ny = (sy + (row / rows) * sH) / ih;
          if (isTemplateWedge(nx, ny, r, g, b)) continue;

          hx[count] = offX + col * gap + gap / 2;
          hy[count] = offY + row * gap + gap / 2;
          if (reduce) {
            x[count] = hx[count];
            y[count] = hy[count];
          } else {
            // fly-in intro from a random point
            x[count] = Math.random() * w;
            y[count] = Math.random() * h;
          }
          vx[count] = 0;
          vy[count] = 0;
          colors.push(`rgb(${r},${g},${b})`);
          count++;
        }
      }

      particles = { x, y, vx, vy, hx, hy, colors, count, size: Math.max(1.5, gap - 2) };
    };

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      const p = particles;
      if (p) {
        const R = repelRadius;
        const R2 = R * R;
        // cursor velocity → particles get flung along the travel direction
        const cvx = Math.max(-24, Math.min(24, pointer.x - pointer.px));
        const cvy = Math.max(-24, Math.min(24, pointer.y - pointer.py));
        pointer.px = pointer.x;
        pointer.py = pointer.y;
        // scatter only while the cursor is moving — a resting cursor leaves
        // no hole, and the image heals underneath it
        const kick = Math.min(1, Math.hypot(cvx, cvy) / 14);

        for (let i = 0; i < p.count; i++) {
          if (!reduce) {
            const dx = p.x[i] - pointer.x;
            const dy = p.y[i] - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (kick > 0.01 && d2 < R2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const falloff = (R - d) / R;
              const f = falloff * repelStrength * kick;
              // radial burst + directional fling + chaotic tumble
              p.vx[i] +=
                (dx / d) * f +
                cvx * falloff * 0.18 +
                (Math.random() - 0.5) * f * 1.1;
              p.vy[i] +=
                (dy / d) * f +
                cvy * falloff * 0.18 +
                (Math.random() - 0.5) * f * 1.1;
            }
            // gentle spring home + light damping → slow, floaty return
            p.vx[i] += (p.hx[i] - p.x[i]) * 0.018;
            p.vy[i] += (p.hy[i] - p.y[i]) * 0.018;
            p.vx[i] *= 0.915;
            p.vy[i] *= 0.915;
            p.x[i] += p.vx[i];
            p.y[i] += p.vy[i];
          }
          ctx.fillStyle = p.colors[i];
          ctx.fillRect(p.x[i], p.y[i], p.size, p.size);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      if (pointer.x < -9000) {
        pointer.px = nx;
        pointer.py = ny;
      }
      pointer.x = nx;
      pointer.y = ny;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.px = -9999;
      pointer.py = -9999;
    };

    img.onload = () => {
      build();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => build());
    ro.observe(container);
    // listen on the whole hero so the field reacts before you reach it
    const zone = container.closest("section") ?? container;
    zone.addEventListener("pointermove", onPointer as EventListener, { passive: true });
    zone.addEventListener("pointerleave", onLeave as EventListener);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      zone.removeEventListener("pointermove", onPointer as EventListener);
      zone.removeEventListener("pointerleave", onLeave as EventListener);
    };
  }, [src, gap, repelRadius, repelStrength, fit, reduce]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
