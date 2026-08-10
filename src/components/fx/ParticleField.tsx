"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Canvas particle network — drifting nodes connected by fading circuit lines.
 * Nodes near the pointer get pulled toward it and glow brighter.
 */
export function ParticleField({
  className,
  density = 11000,
  maxSpeed = 0.22,
  linkDistance = 130,
}: {
  className?: string;
  /** px^2 of canvas area per particle (higher = fewer particles) */
  density?: number;
  maxSpeed?: number;
  linkDistance?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };

    const seed = () => {
      const count = Math.min(160, Math.floor((w * h) / density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * maxSpeed * 2,
        vy: (Math.random() - 0.5) * maxSpeed * 2,
        r: 0.8 + Math.random() * 1.4,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        // gentle pointer attraction
        const pdx = pointer.x - n.x;
        const pdy = pointer.y - n.y;
        const pd2 = pdx * pdx + pdy * pdy;
        if (pd2 < 160 * 160) {
          n.vx += (pdx / Math.sqrt(pd2 + 1)) * 0.012;
          n.vy += (pdy / Math.sqrt(pd2 + 1)) * 0.012;
        }
        // clamp speed
        const sp = Math.hypot(n.vx, n.vy);
        const cap = maxSpeed * 3;
        if (sp > cap) {
          n.vx = (n.vx / sp) * cap;
          n.vy = (n.vy / sp) * cap;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            const alpha = (1 - Math.sqrt(d2) / linkDistance) * 0.35;
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const pd = Math.hypot(pointer.x - n.x, pointer.y - n.y);
        const hot = pd < 160;
        ctx.fillStyle = hot
          ? "rgba(29, 78, 216, 0.9)"
          : "rgba(37, 99, 235, 0.5)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, hot ? n.r + 0.6 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, density, maxSpeed, linkDistance]);

  if (reduce) return null;
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
