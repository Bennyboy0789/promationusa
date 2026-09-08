"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { Config } from "./WorkTableConfigurator";

/**
 * Parametric render of the configured work table.
 *
 * Every option drives real geometry — station length and board width size the
 * frame, the conveyance choice swaps the bed (belt, chain, pins, timing belt,
 * round belts), and lighting, trays and the swing arm come and go as modelled
 * parts. The point is Mike's ask from the review call taken literally: the
 * visitor sees the machine they specified, not a diagram of it.
 *
 * Rendering choices are showroom, not CAD: a studio environment map for the
 * powder-coat and aluminium to reflect, ACES tone mapping, soft shadows, and
 * a slow turntable until the visitor grabs it.
 */

// ---- dimensions (metres) ---------------------------------------------------

const LENGTH_M: Record<Config["length"], number> = {
  "1000": 1.0,
  "1500": 1.5,
  "2000": 2.0,
  "custom-l": 2.4,
};

const DEPTH_M: Record<Config["width"], number> = {
  "250": 0.38,
  "330": 0.46,
  "460": 0.6,
  "custom-w": 0.68,
};

const TOP_Y = 0.92; // worktop height
const RAIL_H = 0.09; // conveyor side rail height
const POST = 0.04; // aluminium extrusion section

// ---- materials -------------------------------------------------------------

function makeMaterials() {
  return {
    alu: new THREE.MeshStandardMaterial({ color: 0xc7ccd4, metalness: 0.75, roughness: 0.38 }),
    panel: new THREE.MeshStandardMaterial({ color: 0xf0f2f5, metalness: 0.15, roughness: 0.5 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x2a3038, metalness: 0.4, roughness: 0.6 }),
    beltEsd: new THREE.MeshStandardMaterial({ color: 0x284a3c, metalness: 0.05, roughness: 0.85 }),
    beltRib: new THREE.MeshStandardMaterial({ color: 0x23272e, metalness: 0.1, roughness: 0.8 }),
    chain: new THREE.MeshStandardMaterial({ color: 0x7d838d, metalness: 0.9, roughness: 0.35 }),
    bin: new THREE.MeshStandardMaterial({ color: 0x2f6fd0, metalness: 0.05, roughness: 0.55 }),
    binInner: new THREE.MeshStandardMaterial({ color: 0x1d4487, metalness: 0.05, roughness: 0.8 }),
    red: new THREE.MeshStandardMaterial({ color: 0xc22a2a, metalness: 0.2, roughness: 0.4 }),
    yellow: new THREE.MeshStandardMaterial({ color: 0xe8c73a, metalness: 0.1, roughness: 0.55 }),
    screen: new THREE.MeshStandardMaterial({
      color: 0x0c1a2e,
      emissive: 0x7fb2ff,
      emissiveIntensity: 0.55,
      roughness: 0.3,
    }),
    lightLens: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfff3d6,
      emissiveIntensity: 2.2,
      roughness: 0.3,
    }),
    foot: new THREE.MeshStandardMaterial({ color: 0x14171b, metalness: 0.3, roughness: 0.7 }),
  };
}
type Mats = ReturnType<typeof makeMaterials>;

/** The lowercase wordmark on the front rail, drawn once onto a canvas. */
function wordmarkTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 96;
  const g = c.getContext("2d")!;
  g.fillStyle = "#f0f2f5";
  g.fillRect(0, 0, 512, 96);
  g.fillStyle = "#346fb6";
  g.font = "600 58px Archivo, 'Segoe UI', sans-serif";
  g.textBaseline = "middle";
  g.textAlign = "center";
  g.fillText("promation", 256, 52);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// ---- model -----------------------------------------------------------------

function box(w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function cylinder(r: number, h: number, m: THREE.Material, x = 0, y = 0, z = 0, rotZ = 0) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 24), m);
  mesh.position.set(x, y, z);
  mesh.rotation.z = rotZ;
  mesh.castShadow = true;
  return mesh;
}

function buildBed(g: THREE.Group, cfg: Config, mats: Mats, L: number, D: number) {
  const innerD = D - 0.06; // between the side rails
  const y = TOP_Y - 0.012;

  switch (cfg.conveyance) {
    case "esd-flat": {
      g.add(box(L - 0.02, 0.012, innerD, mats.beltEsd, 0, y, 0));
      break;
    }
    case "o6b-chain":
    case "pin-chain": {
      const zOff = innerD / 2 - 0.035;
      for (const z of [-zOff, zOff]) {
        g.add(box(L - 0.02, 0.014, 0.05, mats.dark, 0, y, z));
        const pitch = cfg.conveyance === "o6b-chain" ? 0.075 : 0.1;
        for (let x = -L / 2 + 0.06; x <= L / 2 - 0.06; x += pitch) {
          if (cfg.conveyance === "o6b-chain") {
            g.add(cylinder(0.012, 0.046, mats.chain, x, y + 0.012, z, Math.PI / 2));
          } else {
            g.add(cylinder(0.005, 0.028, mats.chain, x, y + 0.02, z));
          }
        }
      }
      break;
    }
    case "timing-belt": {
      const zOff = innerD / 2 - 0.045;
      for (const z of [-zOff, zOff]) {
        g.add(box(L - 0.02, 0.014, 0.07, mats.beltRib, 0, y, z));
        for (let x = -L / 2 + 0.04; x <= L / 2 - 0.04; x += 0.05) {
          g.add(box(0.018, 0.006, 0.07, mats.dark, x, y + 0.01, z));
        }
      }
      break;
    }
    case "round-belt": {
      const zOff = innerD / 2 - 0.03;
      for (const z of [-zOff, zOff]) {
        g.add(cylinder(0.009, L - 0.04, mats.beltEsd, 0, y + 0.006, z, Math.PI / 2));
      }
      break;
    }
  }
}

function buildModel(cfg: Config, wordmark: THREE.CanvasTexture): THREE.Group {
  const mats = makeMaterials();
  const g = new THREE.Group();
  const L = LENGTH_M[cfg.length];
  const D = DEPTH_M[cfg.width];

  // frame posts, lower shelf and feet
  const px = L / 2 - POST / 2;
  const pz = D / 2 - POST / 2;
  for (const [x, z] of [[-px, -pz], [px, -pz], [-px, pz], [px, pz]] as const) {
    g.add(box(POST, TOP_Y - RAIL_H, POST, mats.alu, x, (TOP_Y - RAIL_H) / 2, z));
    g.add(cylinder(0.022, 0.05, mats.foot, x, 0.025, z));
  }
  g.add(box(L - 0.02, 0.02, D - 0.02, mats.panel, 0, 0.28, 0)); // lower shelf
  for (const z of [-pz, pz]) g.add(box(L - 0.02, POST, POST, mats.alu, 0, 0.55, z)); // cross braces

  // conveyor bed: side rails, end caps, bed plate
  for (const z of [-(D / 2 - 0.015), D / 2 - 0.015]) {
    g.add(box(L, RAIL_H, 0.03, mats.panel, 0, TOP_Y - RAIL_H / 2 + 0.02, z));
  }
  for (const x of [-(L / 2 - 0.015), L / 2 - 0.015]) {
    g.add(box(0.03, RAIL_H, D - 0.06, mats.alu, x, TOP_Y - RAIL_H / 2 + 0.02, 0));
  }
  g.add(box(L, 0.05, D, mats.alu, 0, TOP_Y - RAIL_H - 0.005, 0)); // bed underframe
  buildBed(g, cfg, mats, L, D);

  // wordmark plate on the front rail
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.34, 0.055),
    new THREE.MeshBasicMaterial({ map: wordmark })
  );
  plate.position.set(0, TOP_Y - RAIL_H / 2 + 0.02, D / 2 + 0.0005);
  g.add(plate);

  // e-stop on a yellow plate, front right
  const ex = L / 2 - 0.14;
  g.add(box(0.07, 0.05, 0.012, mats.yellow, ex, TOP_Y - 0.03, D / 2 + 0.006));
  const stop = cylinder(0.016, 0.022, mats.red, ex, TOP_Y - 0.025, D / 2 + 0.022);
  stop.rotation.x = Math.PI / 2;
  g.add(stop);

  // small controls box under the bed with a power LED
  g.add(box(0.16, 0.1, 0.05, mats.dark, L / 2 - 0.16, TOP_Y - RAIL_H - 0.09, D / 2 - 0.01));
  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.006),
    new THREE.MeshStandardMaterial({ color: 0x30d072, emissive: 0x30d072, emissiveIntensity: 2 })
  );
  led.position.set(L / 2 - 0.11, TOP_Y - RAIL_H - 0.06, D / 2 + 0.016);
  g.add(led);

  // overhead light gantry
  if (cfg.light) {
    const gy = TOP_Y + 0.62;
    for (const x of [-(L / 2 - POST / 2), L / 2 - POST / 2]) {
      g.add(box(POST, gy - TOP_Y + 0.06, POST, mats.alu, x, TOP_Y + (gy - TOP_Y + 0.06) / 2 - 0.03, -(D / 2 - POST / 2)));
    }
    g.add(box(L, POST, POST, mats.alu, 0, gy, -(D / 2 - POST / 2)));
    // fixture reaches forward over the belt
    g.add(box(0.04, 0.04, 0.3, mats.alu, 0, gy, -(D / 2) + 0.17));
    g.add(box(L * 0.72, 0.045, 0.11, mats.panel, 0, gy - 0.04, 0));
    const lens = box(L * 0.66, 0.008, 0.08, mats.lightLens, 0, gy - 0.065, 0);
    lens.castShadow = false;
    g.add(lens);
  }

  // rear parts trays with bins
  if (cfg.trays !== "none") {
    const rows = cfg.trays === "double" ? 2 : 1;
    const rearZ = -(D / 2) - 0.09;
    for (const x of [-(L / 2 - 0.1), L / 2 - 0.1]) {
      g.add(box(POST, 0.34 + (rows - 1) * 0.2, POST, mats.alu, x, TOP_Y + (0.34 + (rows - 1) * 0.2) / 2, rearZ));
    }
    for (let r = 0; r < rows; r++) {
      const ty = TOP_Y + 0.22 + r * 0.2;
      const shelf = box(L - 0.12, 0.014, 0.24, mats.panel, 0, ty, rearZ - 0.02);
      shelf.rotation.x = -0.32; // tipped toward the operator
      g.add(shelf);
      const n = Math.max(2, Math.floor((L - 0.2) / 0.3));
      for (let i = 0; i < n; i++) {
        const bx = -((n - 1) / 2) * 0.3 + i * 0.3;
        const bin = new THREE.Group();
        bin.add(box(0.26, 0.11, 0.17, mats.bin, 0, 0, 0));
        bin.add(box(0.24, 0.1, 0.15, mats.binInner, 0, 0.012, 0));
        bin.position.set(bx, ty + 0.075, rearZ - 0.03);
        bin.rotation.x = -0.32;
        g.add(bin);
      }
    }
  }

  // swing-arm monitor
  if (cfg.swingArm) {
    const sx = L / 2 + 0.09;
    g.add(cylinder(0.024, 0.62, mats.alu, sx, TOP_Y + 0.31, 0));
    const arm = box(0.4, 0.035, 0.035, mats.alu, sx + 0.16, TOP_Y + 0.58, 0.1);
    arm.rotation.y = -0.5;
    g.add(arm);
    const mon = new THREE.Group();
    mon.add(box(0.34, 0.22, 0.02, mats.dark, 0, 0, 0));
    const scr = box(0.31, 0.19, 0.004, mats.screen, 0, 0, 0.012);
    scr.castShadow = false;
    mon.add(scr);
    mon.position.set(sx + 0.32, TOP_Y + 0.52, 0.21);
    mon.rotation.y = -0.55;
    mon.rotation.x = -0.08;
    g.add(mon);
  }

  return g;
}

function disposeGroup(g: THREE.Group) {
  g.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(m)) m.forEach((x) => x.dispose());
    else m?.dispose();
  });
}

// ---- component -------------------------------------------------------------

export function WorkTablePreview3D({ config }: { config: Config }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const configRef = useRef(config);
  const rebuildRef = useRef<(c: Config) => void>(() => undefined);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.set(2.7, 1.75, 3.1);

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 5, 2.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -2.4;
    key.shadow.camera.right = 2.4;
    key.shadow.camera.top = 2.4;
    key.shadow.camera.bottom = -2.4;
    key.shadow.bias = -0.0004;
    key.shadow.radius = 6;
    scene.add(key);
    scene.add(new THREE.AmbientLight(0xdde6f2, 0.35));

    const floor = new THREE.Mesh(new THREE.CircleGeometry(4, 48), new THREE.ShadowMaterial({ opacity: 0.16 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.72, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1.6;
    controls.maxDistance = 7;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.enablePan = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.9;
    const stopSpin = () => (controls.autoRotate = false);
    renderer.domElement.addEventListener("pointerdown", stopSpin);

    const wordmark = wordmarkTexture();
    let model = buildModel(configRef.current, wordmark);
    scene.add(model);

    // Keep the machine framed as its size changes — but only until the
    // visitor takes the camera; after that their view is theirs.
    const fitCamera = (c: Config) => {
      const L = LENGTH_M[c.length];
      const dist = Math.max(2.6, L * 1.9);
      const dir = camera.position.clone().sub(controls.target).normalize();
      camera.position.copy(controls.target.clone().add(dir.multiplyScalar(dist)));
    };
    fitCamera(configRef.current);

    rebuildRef.current = (c: Config) => {
      scene.remove(model);
      disposeGroup(model);
      model = buildModel(c, wordmark);
      scene.add(model);
      if (controls.autoRotate) fitCamera(c);
    };

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    const loop = () => {
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", stopSpin);
      controls.dispose();
      disposeGroup(model);
      wordmark.dispose();
      pmrem.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
      rebuildRef.current = () => undefined;
    };
  }, []);

  useEffect(() => {
    configRef.current = config;
    rebuildRef.current(config);
  }, [config]);

  return (
    <div>
      <div ref={hostRef} className="h-[26rem] w-full sm:h-[30rem]" aria-label="3D model of the configured work table" role="img" />
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Drag to rotate &middot; scroll to zoom
      </p>
    </div>
  );
}
