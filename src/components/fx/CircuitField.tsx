"use client";

import { useEffect, useRef } from "react";

/**
 * A living printed circuit board.
 *
 * Traces route themselves across the field the way a real autorouter lays them
 * down — orthogonal and 45-degree bends on a fixed grid — and when a route
 * lands, the pad blooms gold, like a joint being soldered. Three depth layers
 * drift at different rates so the board reads as a landscape, not a pattern.
 *
 * Drawn entirely from geometry on one canvas: no images, no libraries.
 */

type Pt = { x: number; y: number };

type Trace = {
  pts: Pt[];
  lens: number[];
  total: number;
  head: number;
  speed: number;
  layer: number;
  state: "routing" | "soldering" | "fading";
  bloom: number;
  alpha: number;
  vias: boolean[];
};

/** Eight compass directions: traces only ever turn in 45-degree steps. */
const DIRS: Pt[] = [
  { x: 1, y: 0 },
  { x: 0.7071, y: 0.7071 },
  { x: 0, y: 1 },
  { x: -0.7071, y: 0.7071 },
  { x: -1, y: 0 },
  { x: -0.7071, y: -0.7071 },
  { x: 0, y: -1 },
  { x: 0.7071, y: -0.7071 },
];

const LAYERS = [
  { width: 1, dim: 0.38, parallax: 0.25, speed: 0.55 },
  { width: 1.6, dim: 0.66, parallax: 0.55, speed: 0.85 },
  { width: 2.5, dim: 1, parallax: 1, speed: 1.15 },
];

function buildTrace(w: number, h: number, grid: number, layer: number): Trace {
  const startX = -grid * 3 + Math.random() * (w + grid * 6);
  const startY = Math.random() * h;

  const pts: Pt[] = [{ x: startX, y: startY }];
  let dir = Math.random() < 0.6 ? 0 : Math.random() < 0.5 ? 1 : 7;
  const legs = 3 + Math.floor(Math.random() * 4);

  for (let i = 0; i < legs; i++) {
    const turn = Math.random();
    if (turn < 0.3) dir = (dir + 1) % 8;
    else if (turn < 0.6) dir = (dir + 7) % 8;

    const d = DIRS[dir];
    const len = grid * (2 + Math.floor(Math.random() * 7));
    const last = pts[pts.length - 1];
    pts.push({ x: last.x + d.x * len, y: last.y + d.y * len });
  }

  const lens = [0];
  for (let i = 1; i < pts.length; i++) {
    lens.push(
      lens[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
    );
  }

  return {
    pts,
    lens,
    total: lens[lens.length - 1],
    head: 0,
    speed: (90 + Math.random() * 140) * LAYERS[layer].speed,
    layer,
    state: "routing",
    bloom: 0,
    alpha: 1,
    vias: pts.map(() => Math.random() < 0.45),
  };
}

function pointAt(t: Trace, at: number): Pt {
  for (let i = 1; i < t.pts.length; i++) {
    if (at <= t.lens[i]) {
      const span = t.lens[i] - t.lens[i - 1] || 1;
      const f = (at - t.lens[i - 1]) / span;
      return {
        x: t.pts[i - 1].x + (t.pts[i].x - t.pts[i - 1].x) * f,
        y: t.pts[i - 1].y + (t.pts[i].y - t.pts[i - 1].y) * f,
      };
    }
  }
  return t.pts[t.pts.length - 1];
}

export function CircuitField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let grid = 26;
    let traces: Trace[] = [];
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const density = () => {
      const target = Math.round((w * h) / 30000);
      return Math.max(8, Math.min(reduced ? 18 : 34, target));
    };

    const spawn = (): Trace => {
      const layer = Math.random() < 0.45 ? 0 : Math.random() < 0.7 ? 1 : 2;
      const t = buildTrace(w, h, grid, layer);
      if (reduced) {
        t.head = t.total;
        t.state = "soldering";
        t.bloom = 1;
      }
      return t;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grid = w < 640 ? 20 : 26;
      traces = Array.from({ length: density() }, () => {
        const t = spawn();
        t.head = Math.random() * t.total;
        return t;
      });
    };

    const drawPad = (p: Pt, r: number, alpha: number, ring: boolean) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(125,185,255," + alpha + ")";
      ctx.fill();
      if (ring) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.1, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(125,185,255," + alpha * 0.5 + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const render = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      ctx.clearRect(0, 0, w, h);

      for (const t of traces) {
        const L = LAYERS[t.layer];

        if (!reduced) {
          if (t.state === "routing") {
            t.head += t.speed * dt;
            if (t.head >= t.total) {
              t.head = t.total;
              t.state = "soldering";
            }
          } else if (t.state === "soldering") {
            t.bloom += dt * 0.85;
            if (t.bloom >= 1) t.state = "fading";
          } else {
            t.alpha -= dt * 0.2;
          }
        }

        const a = Math.max(t.alpha, 0) * L.dim;
        if (a <= 0.01) continue;

        const ox = (pointer.x - 0.5) * -26 * L.parallax;
        const oy = (pointer.y - 0.5) * -18 * L.parallax;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const pathTo = (limit: number) => {
          ctx.beginPath();
          ctx.moveTo(t.pts[0].x, t.pts[0].y);
          for (let i = 1; i < t.pts.length; i++) {
            if (limit >= t.lens[i]) {
              ctx.lineTo(t.pts[i].x, t.pts[i].y);
            } else {
              const p = pointAt(t, limit);
              ctx.lineTo(p.x, p.y);
              break;
            }
          }
        };

        // soft underglow, then a crisp core
        pathTo(t.head);
        ctx.strokeStyle = "rgba(56,130,246," + a * 0.5 + ")";
        ctx.lineWidth = L.width * 4;
        ctx.stroke();

        pathTo(t.head);
        ctx.strokeStyle = "rgba(150,205,255," + a + ")";
        ctx.lineWidth = L.width;
        ctx.stroke();

        // pads and vias at every vertex the route has passed
        for (let i = 0; i < t.pts.length; i++) {
          if (t.lens[i] > t.head) break;
          drawPad(t.pts[i], L.width * 1.5, a * 0.9, t.vias[i]);
        }

        // the routing head
        if (t.state === "routing") {
          const p = pointAt(t, t.head);
          const g = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            16 * L.parallax + 6
          );
          g.addColorStop(0, "rgba(226,244,255," + a + ")");
          g.addColorStop(0.4, "rgba(120,190,255," + a * 0.5 + ")");
          g.addColorStop(1, "rgba(120,190,255,0)");
          ctx.fillStyle = g;
          ctx.fillRect(p.x - 30, p.y - 30, 60, 60);
        }

        // the joint being soldered: a gold bloom at the landing pad
        if (t.state !== "routing") {
          const end = t.pts[t.pts.length - 1];
          const fade = Math.max(t.alpha, 0);
          // Rise to a peak as the joint takes, then hold a residual warmth
          // while it fades — a joint that just went cold, not one that vanished.
          const peak = Math.sin(Math.min(t.bloom, 1) * Math.PI);
          const e = reduced ? 0.6 : Math.max(peak, t.state === "fading" ? 0.5 : 0);
          const r = (14 + 40 * e) * (0.6 + L.parallax * 0.4);
          const g = ctx.createRadialGradient(end.x, end.y, 0, end.x, end.y, r);
          g.addColorStop(0, "rgba(255,232,186," + 0.95 * e * fade + ")");
          g.addColorStop(0.32, "rgba(255,170,58," + 0.55 * e * fade + ")");
          g.addColorStop(1, "rgba(255,168,60,0)");
          // Additive, so the gold reads warm against the cool traces instead of
          // being washed out by them.
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = g;
          ctx.fillRect(end.x - r, end.y - r, r * 2, r * 2);
          ctx.restore();

          ctx.beginPath();
          ctx.arc(end.x, end.y, L.width * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,206,132," + fade * 0.95 + ")";
          ctx.fill();
        }

        ctx.restore();
      }

      if (!reduced) {
        for (let i = 0; i < traces.length; i++) {
          if (traces[i].alpha <= 0) traces[i] = spawn();
        }
      }

      if (visible && !reduced) raf = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Stop burning frames once the hero is scrolled past.
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        cancelAnimationFrame(raf);
        if (visible && !reduced) {
          last = performance.now();
          raf = requestAnimationFrame(render);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onPointer, { passive: true });

    if (reduced) render(performance.now());
    else raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={"pointer-events-none absolute inset-0 h-full w-full " + className}
    />
  );
}
