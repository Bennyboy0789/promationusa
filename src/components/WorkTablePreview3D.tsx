"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import type { Config } from "./WorkTableConfigurator";

/**
 * Parametric render of the configured work table, staged in a clean warehouse.
 *
 * Every option drives real geometry — station length and board width size the
 * frame, the conveyance choice swaps the bed (belt, chain, pins, timing belt,
 * round belts), and lighting, trays and the swing arm come and go as modelled
 * parts. The machine stands in a blacked-out modern garage bay — satin dark
 * walls, a PROMATION-blue LED line around the perimeter — with the navy
 * PROMATION mat out front.
 *
 * The "HDR" look is a real pipeline, not a filter: ACES tone mapping with
 * lifted exposure, an environment map driving reflections in the powder-coat
 * and aluminium, and a restrained bloom pass that lets the light fixture,
 * ceiling strips and status LEDs actually glow.
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

const ROOM = 18; // garage bay is a ROOM x ROOM footprint
const CEIL = 4.6;

// ---- materials -------------------------------------------------------------

function makeMaterials() {
  return {
    alu: new THREE.MeshStandardMaterial({ color: 0xc7ccd4, metalness: 0.75, roughness: 0.38 }),
    panel: new THREE.MeshStandardMaterial({ color: 0xf0f2f5, metalness: 0.15, roughness: 0.5 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x2a3038, metalness: 0.4, roughness: 0.6 }),
    beltEsd: new THREE.MeshStandardMaterial({ color: 0x2c6e50, metalness: 0.05, roughness: 0.85 }),
    beltRib: new THREE.MeshStandardMaterial({ color: 0x23272e, metalness: 0.1, roughness: 0.8 }),
    chain: new THREE.MeshStandardMaterial({ color: 0x7d838d, metalness: 0.9, roughness: 0.35 }),
    bin: new THREE.MeshStandardMaterial({ color: 0x2a6fdd, metalness: 0.05, roughness: 0.5 }),
    binInner: new THREE.MeshStandardMaterial({ color: 0x1d4487, metalness: 0.05, roughness: 0.8 }),
    red: new THREE.MeshStandardMaterial({ color: 0xc22a2a, metalness: 0.2, roughness: 0.4 }),
    yellow: new THREE.MeshStandardMaterial({ color: 0xe8c73a, metalness: 0.1, roughness: 0.55 }),
    screen: new THREE.MeshStandardMaterial({
      color: 0x0c1a2e,
      emissive: 0x7fb2ff,
      emissiveIntensity: 0.9,
      roughness: 0.3,
    }),
    lightLens: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfff3d6,
      emissiveIntensity: 3.2,
      roughness: 0.3,
    }),
    foot: new THREE.MeshStandardMaterial({ color: 0x14171b, metalness: 0.3, roughness: 0.7 }),
  };
}
type Mats = ReturnType<typeof makeMaterials>;

/** Badge plate on the front rail; the real wordmark is drawn in by applyLogo. */
function wordmarkTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 96;
  const g = c.getContext("2d")!;
  g.fillStyle = "#f0f2f5";
  g.fillRect(0, 0, 512, 96);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** The navy floor mat from the product photos, wordmark and all. */
function matTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#232b36";
  g.fillRect(0, 0, 1024, 512);
  // carpet nap: sparse light speckle
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.16)";
    g.fillRect(Math.random() * 1024, Math.random() * 512, 2, 2);
  }
  g.strokeStyle = "#41506b";
  g.lineWidth = 26;
  g.strokeRect(13, 13, 998, 486);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Dark epoxy floor: satin charcoal with faint 2 m saw-cut seams. */
function floorTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#33363c";
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 900; i++) {
    g.fillStyle = Math.random() > 0.5 ? `rgba(160,170,185,${0.02 + Math.random() * 0.04})` : `rgba(0,0,0,${0.05 + Math.random() * 0.08})`;
    const r = 1 + Math.random() * 3;
    g.fillRect(Math.random() * 512, Math.random() * 512, r, r);
  }
  g.strokeStyle = "rgba(18,20,24,0.35)";
  g.lineWidth = 2;
  g.strokeRect(0, 0, 512, 512);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(ROOM / 3, ROOM / 3); // one tile = one 3 m saw-cut bay
  t.anisotropy = 8;
  return t;
}

/**
 * Draw the real PROMATION wordmark onto the badge plate and the floor mat.
 *
 * The logo ships with the site as /promation-logo.png (blue letterforms on
 * transparency). The plate takes it as-is — blue on powder-coat white, like
 * the badges on the machines. The mat recolours the same letterforms to the
 * light blue of the physical entrance mat, via a source-in tint pass.
 */
function applyLogo(plate: THREE.CanvasTexture, mat: THREE.CanvasTexture) {
  const img = new Image();
  img.onload = () => {
    if (!img.naturalWidth) return;

    const pc = plate.image as HTMLCanvasElement;
    const pg = pc.getContext("2d")!;
    pg.fillStyle = "#f0f2f5";
    pg.fillRect(0, 0, pc.width, pc.height);
    const ps = Math.min((pc.width - 56) / img.width, (pc.height - 26) / img.height);
    pg.drawImage(img, (pc.width - img.width * ps) / 2, (pc.height - img.height * ps) / 2, img.width * ps, img.height * ps);
    plate.needsUpdate = true;

    const tint = document.createElement("canvas");
    tint.width = img.width;
    tint.height = img.height;
    const tg = tint.getContext("2d")!;
    tg.drawImage(img, 0, 0);
    tg.globalCompositeOperation = "source-in";
    tg.fillStyle = "#74abe6";
    tg.fillRect(0, 0, tint.width, tint.height);

    const mc = mat.image as HTMLCanvasElement;
    const mg = mc.getContext("2d")!;
    const ms = Math.min((mc.width - 240) / img.width, (mc.height - 220) / img.height);
    mg.drawImage(tint, (mc.width - img.width * ms) / 2, (mc.height - img.height * ms) / 2, img.width * ms, img.height * ms);
    mat.needsUpdate = true;
  };
  img.src = "/promation-logo.png";
}

// ---- warehouse -------------------------------------------------------------

function buildGarage(floorTex: THREE.CanvasTexture): THREE.Group {
  const g = new THREE.Group();

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM, ROOM),
    new THREE.MeshStandardMaterial({ map: floorTex, metalness: 0.22, roughness: 0.34 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  g.add(floor);

  // satin black shell — walls and ceiling in one
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x16181c, roughness: 0.6, metalness: 0.25, side: THREE.BackSide });
  const shell = new THREE.Mesh(new THREE.BoxGeometry(ROOM, CEIL + 0.05, ROOM), wallMat);
  // bottom face sits below the floor plane so the two never z-fight
  shell.position.y = (CEIL + 0.05) / 2 - 0.05;
  shell.receiveShadow = true;
  g.add(shell);

  // PROMATION-blue LED line around the perimeter at waist height
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x11253f,
    emissive: 0x2f7ddd,
    emissiveIntensity: 2.6,
    roughness: 0.4,
  });
  const half = ROOM / 2 - 0.03;
  for (const [w, d, x, z] of [
    [ROOM - 0.1, 0.03, 0, -half],
    [ROOM - 0.1, 0.03, 0, half],
    [0.03, ROOM - 0.1, -half, 0],
    [0.03, ROOM - 0.1, half, 0],
  ] as const) {
    const led = new THREE.Mesh(new THREE.BoxGeometry(w, 0.045, d), ledMat);
    led.position.set(x, 0.95, z);
    g.add(led);
  }

  return g;
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

function buildModel(cfg: Config, wordmark: THREE.CanvasTexture, mat: THREE.CanvasTexture): THREE.Group {
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
  plate.position.set(0, TOP_Y - RAIL_H / 2 + 0.02, D / 2 + 0.031);
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
    new THREE.MeshStandardMaterial({ color: 0x30d072, emissive: 0x30d072, emissiveIntensity: 3 })
  );
  led.position.set(L / 2 - 0.11, TOP_Y - RAIL_H - 0.06, D / 2 + 0.016);
  g.add(led);

  // the PROMATION mat on the floor in front of the station
  const matW = Math.min(L * 0.95, 1.9);
  const floorMat = new THREE.Mesh(
    new THREE.PlaneGeometry(matW, matW * 0.5),
    new THREE.MeshStandardMaterial({ map: mat, roughness: 0.95 })
  );
  floorMat.rotation.x = -Math.PI / 2;
  floorMat.position.set(0, 0.004, D / 2 + 0.12 + matW * 0.25);
  floorMat.receiveShadow = true;
  g.add(floorMat);

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

function disposeGroup(g: THREE.Object3D) {
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

    // Tunables, overridable from the query string while this page is a
    // prototype: ?exp=1.1&bs=0.2&br=0.3&bt=1.2&env=0.9
    const q = new URLSearchParams(window.location.search);
    const num = (k: string, d: number) => {
      const v = parseFloat(q.get(k) ?? "");
      return Number.isFinite(v) ? v : d;
    };
    const TUNE = {
      exposure: num("exp", 1.1),
      bloomStrength: num("bs", 0.3),
      bloomRadius: num("br", 0.35),
      bloomThreshold: num("bt", 2.1),
      env: num("env", 0.42),
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = TUNE.exposure;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0d10);
    scene.fog = new THREE.Fog(0x0b0d10, 11, 26);
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = TUNE.env;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.06, 40);
    camera.position.set(2.7, 1.9, 3.1);

    const key = new THREE.DirectionalLight(0xfff4e8, 1.5);
    key.position.set(3, 5, 2.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -4.2;
    key.shadow.camera.right = 4.2;
    key.shadow.camera.top = 4.2;
    key.shadow.camera.bottom = -4.2;
    key.shadow.bias = -0.0004;
    key.shadow.radius = 6;
    scene.add(key);
    // cool rim from behind so the powder-coat edges catch light
    const rim = new THREE.DirectionalLight(0x9cc4ff, 0.7);
    rim.position.set(-3.5, 2.6, -3);
    scene.add(rim);
    scene.add(new THREE.HemisphereLight(0x9fb8dd, 0x23262b, 0.3));

    const warehouse = buildGarage(floorTexture());
    scene.add(warehouse);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.92, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 2.0;
    controls.maxDistance = 7.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.enablePan = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.9;
    const stopSpin = () => (controls.autoRotate = false);
    renderer.domElement.addEventListener("pointerdown", stopSpin);

    // HDR-style output: render, bloom the emissives, then tone-map.
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), TUNE.bloomStrength, TUNE.bloomRadius, TUNE.bloomThreshold);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const wordmark = wordmarkTexture();
    const mat = matTexture();
    applyLogo(wordmark, mat);
    let model = buildModel(configRef.current, wordmark, mat);
    scene.add(model);

    // Keep the machine framed as its size changes — but only until the
    // visitor takes the camera; after that their view is theirs.
    const fitCamera = (c: Config) => {
      const half = LENGTH_M[c.length] / 2 + (c.swingArm ? 0.85 : 0.45);
      const dist = Math.min(7, Math.max(4.6, half * 3.0));
      const dir = camera.position.clone().sub(controls.target).normalize();
      camera.position.copy(controls.target.clone().add(dir.multiplyScalar(dist)));
    };
    fitCamera(configRef.current);

    rebuildRef.current = (c: Config) => {
      scene.remove(model);
      disposeGroup(model);
      model = buildModel(c, wordmark, mat);
      scene.add(model);
      if (controls.autoRotate) fitCamera(c);
    };

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      camera.aspect = w / h;
      // On the wide layout the control panels live on the left, so the
      // machine is framed right of centre — a view offset keeps it there
      // through every orbit angle. Centered again on narrow screens.
      if (w > 900) camera.setViewOffset(w, h, -Math.round(w * 0.13), 0, w, h);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    const loop = () => {
      controls.update();
      composer.render();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", stopSpin);
      controls.dispose();
      disposeGroup(model);
      disposeGroup(warehouse);
      wordmark.dispose();
      mat.dispose();
      composer.dispose();
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

  // Fills its container — the page decides how much of the screen the
  // environment gets, and the resize observer follows.
  return <div ref={hostRef} className="h-full w-full" aria-label="3D model of the configured work table in a black showroom bay" role="img" />;
}
