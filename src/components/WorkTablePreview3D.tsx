"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
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
 * parts. The machine stands in a modern showroom bay — vertical oak slat walls
 * over a black backing and a dark concrete slab — with the navy PROMATION mat
 * out front.
 *
 * The "HDR" look is a real pipeline, not a filter: ACES tone mapping with
 * lifted exposure, an environment map driving reflections in the powder-coat
 * and aluminium, and a restrained bloom pass that lets the light fixture,
 * ceiling strips and status LEDs actually glow.
 */

// ---- dimensions (metres) ---------------------------------------------------

export const LENGTH_M: Record<Config["length"], number> = {
  "1000": 1.0,
  "1500": 1.5,
  "2000": 2.0,
  "custom-l": 2.4,
};

export const DEPTH_M: Record<Config["width"], number> = {
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
    beltEsd: new THREE.MeshStandardMaterial({ color: 0x3ab4c9, metalness: 0.05, roughness: 0.7 }),
    skin: new THREE.MeshStandardMaterial({ color: 0xc9ced5, metalness: 0.2, roughness: 0.55 }),
    pcb: new THREE.MeshStandardMaterial({ color: 0x1d6a43, metalness: 0.1, roughness: 0.55 }),
    beltRib: new THREE.MeshStandardMaterial({ color: 0x23272e, metalness: 0.1, roughness: 0.8 }),
    chain: new THREE.MeshStandardMaterial({ color: 0x7d838d, metalness: 0.9, roughness: 0.35 }),
    bin: new THREE.MeshStandardMaterial({ color: 0x2440dc, metalness: 0.05, roughness: 0.5 }),
    binInner: new THREE.MeshStandardMaterial({ color: 0x172a8f, metalness: 0.05, roughness: 0.8 }),
    red: new THREE.MeshStandardMaterial({ color: 0xc22a2a, metalness: 0.2, roughness: 0.4 }),
    screen: new THREE.MeshStandardMaterial({
      color: 0x0c1a2e,
      emissive: 0x7fb2ff,
      emissiveIntensity: 0.9,
      roughness: 0.3,
    }),
    hmi: new THREE.MeshStandardMaterial({
      color: 0x0f3d24,
      emissive: 0x3ce27a,
      emissiveIntensity: 1.4,
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

/** Dark concrete floor: matte charcoal with a fine aggregate speckle, no seams. */
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
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(ROOM / 3, ROOM / 3); // one tile ≈ 3 m, keeps the speckle fine
  t.anisotropy = 8;
  return t;
}

/** Warm oak: vertical grain streaks with a few tighter dark lines, tileable in Y. */
function woodTexture(): THREE.CanvasTexture {
  const W = 128, H = 1024;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);

  g.fillStyle = "#b39a78";
  g.fillRect(0, 0, W, H);

  // broad tonal bands across the width so no two slats read identical
  for (let i = 0; i < 10; i++) {
    const x = rnd(0, W), w = rnd(12, 40);
    g.fillStyle = Math.random() > 0.5 ? `rgba(225,200,165,${rnd(0.08, 0.16)})` : `rgba(100,75,50,${rnd(0.06, 0.16)})`;
    g.fillRect(x, 0, w, H);
  }

  // grain — long, thin, slightly wandering vertical streaks
  for (let i = 0; i < 90; i++) {
    let x = rnd(0, W);
    const dark = Math.random() > 0.35;
    g.strokeStyle = dark ? `rgba(95,68,42,${rnd(0.12, 0.35)})` : `rgba(240,220,190,${rnd(0.08, 0.24)})`;
    g.lineWidth = rnd(0.6, 2.2);
    g.beginPath();
    g.moveTo(x, 0);
    for (let y = 0; y <= H; y += 32) {
      x += rnd(-1.6, 1.6);
      g.lineTo(x, y);
    }
    g.stroke();
  }

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

/** Soft radial falloff — stretched under the cabinet as a contact shadow. */
function contactShadowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 24, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0.9)");
  grad.addColorStop(0.55, "rgba(0,0,0,0.42)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

/** A dimension label: mono text on a dark pill, always drawn over the model. */
function labelSprite(text: string, x: number, y: number, z: number): THREE.Sprite {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const g = c.getContext("2d")!;
  g.font = "600 28px ui-monospace, SFMono-Regular, Menlo, monospace";
  g.textAlign = "center";
  g.textBaseline = "middle";
  const w = Math.min(248, g.measureText(text).width + 30);
  g.fillStyle = "rgba(5,13,26,0.8)";
  g.beginPath();
  g.roundRect(128 - w / 2, 10, w, 44, 12);
  g.fill();
  g.fillStyle = "#bfe7ff";
  g.fillText(text, 128, 33);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthTest: false }));
  sp.scale.set(0.4, 0.1, 1);
  sp.position.set(x, y, z);
  sp.renderOrder = 10;
  return sp;
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

function buildGarage(floorTex: THREE.CanvasTexture, woodTex: THREE.CanvasTexture): THREE.Group {
  const g = new THREE.Group();

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM, ROOM),
    // Matte, non-metallic: a sealed concrete slab should not mirror the lights.
    new THREE.MeshStandardMaterial({ map: floorTex, metalness: 0, roughness: 0.92 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  g.add(floor);

  // matte black shell behind the slats — the felt backing of a slat wall — and
  // the ceiling in one
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0e1013, roughness: 0.92, metalness: 0, side: THREE.BackSide });
  const shell = new THREE.Mesh(new THREE.BoxGeometry(ROOM, CEIL + 0.05, ROOM), wallMat);
  // bottom face sits below the floor plane so the two never z-fight
  shell.position.y = (CEIL + 0.05) / 2 - 0.05;
  shell.receiveShadow = true;
  g.add(shell);

  // vertical oak slats on all four walls, one instanced draw for the lot
  const SLAT_W = 0.06, SLAT_D = 0.035, SLAT_GAP = 0.03;
  const pitch = SLAT_W + SLAT_GAP;
  const perWall = Math.floor((ROOM - 0.1) / pitch);
  const slatGeo = new THREE.BoxGeometry(SLAT_W, CEIL, SLAT_D);
  const slatMat = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.68, metalness: 0 });
  woodTex.repeat.set(1, CEIL / 1.2); // grain runs up the slat, ~1.2 m per tile
  const slats = new THREE.InstancedMesh(slatGeo, slatMat, perWall * 4);
  slats.receiveShadow = true;
  const m = new THREE.Matrix4();
  const col = new THREE.Color();
  const inset = ROOM / 2 - SLAT_D / 2 - 0.004;
  let idx = 0;
  for (let wall = 0; wall < 4; wall++) {
    for (let i = 0; i < perWall; i++) {
      const along = -ROOM / 2 + 0.05 + pitch * i + SLAT_W / 2;
      const pos =
        wall === 0 ? [along, CEIL / 2, -inset]
        : wall === 1 ? [along, CEIL / 2, inset]
        : wall === 2 ? [-inset, CEIL / 2, along]
        : [inset, CEIL / 2, along];
      m.makeRotationY(wall < 2 ? 0 : Math.PI / 2);
      m.setPosition(pos[0], pos[1], pos[2]);
      slats.setMatrixAt(idx, m);
      // slight per-board tonal variation, as sawn oak has
      slats.setColorAt(idx, col.setHSL(0.09 + Math.random() * 0.012, 0.22, 0.56 + Math.random() * 0.12));
      idx++;
    }
  }
  slats.instanceMatrix.needsUpdate = true;
  if (slats.instanceColor) slats.instanceColor.needsUpdate = true;
  g.add(slats);

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

type Dims = { L: number; D: number };
type Tex = { wordmark: THREE.CanvasTexture; mat: THREE.CanvasTexture; shadow: THREE.CanvasTexture };

function buildModel(cfg: Config, { L, D }: Dims, { wordmark, mat, shadow }: Tex): THREE.Group {
  const mats = makeMaterials();
  const g = new THREE.Group();
  // The cabinet is deeper than the belt it carries — the rear rail, drive and
  // the electrical enclosure all live behind the board path.
  const BD = D + 0.2;

  // ---- cabinet: extrusion posts, grey skins on three sides, open front ------
  const FOOT_H = 0.08;
  const HEADER_H = 0.1;
  const bodyTop = TOP_Y - RAIL_H - 0.03 - HEADER_H; // underside of the header
  const postH = bodyTop - FOOT_H;
  const px = L / 2 - POST / 2;
  const pz = BD / 2 - POST / 2;
  for (const [x, z] of [[-px, -pz], [px, -pz], [-px, pz], [px, pz]] as const) {
    g.add(box(POST, postH, POST, mats.alu, x, FOOT_H + postH / 2, z));
    // levelling feet: black pad on a threaded stem
    g.add(cylinder(0.03, 0.015, mats.foot, x, 0.0075, z));
    g.add(cylinder(0.008, FOOT_H - 0.015, mats.alu, x, 0.015 + (FOOT_H - 0.015) / 2, z));
  }
  const skinY = FOOT_H + postH / 2;
  const skinH = postH;
  for (const x of [-(L / 2 - POST - 0.005), L / 2 - POST - 0.005]) {
    g.add(box(0.01, skinH, BD - POST * 2, mats.skin, x, skinY, 0)); // sides
  }
  g.add(box(L - POST * 2, skinH, 0.01, mats.skin, 0, skinY, -(BD / 2 - POST - 0.005))); // back
  g.add(box(L - POST * 2, 0.012, BD - POST * 2, mats.dark, 0, FOOT_H + 0.03, 0)); // black floor plate
  // inside: electrical enclosure on the back wall, control panel on the
  // left post, terminal block on the floor
  g.add(box(0.28, 0.36, 0.1, mats.panel, 0, FOOT_H + 0.06 + 0.18 + 0.1, -(BD / 2) + POST + 0.06));
  const ctlX = -(L / 2) + POST + 0.012;
  g.add(box(0.02, 0.16, 0.09, mats.dark, ctlX, bodyTop - 0.14, BD / 2 - POST - 0.07));
  const knob = cylinder(0.014, 0.012, mats.red, ctlX + 0.016, bodyTop - 0.1, BD / 2 - POST - 0.07, Math.PI / 2);
  g.add(knob);
  g.add(box(0.08, 0.03, 0.05, mats.dark, -0.1, FOOT_H + 0.05, 0.05));

  // ---- header band under the top: wordmark left, HMI right ------------------
  const headerY = bodyTop + HEADER_H / 2;
  g.add(box(L, HEADER_H, BD, mats.skin, 0, headerY, 0));
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.048),
    new THREE.MeshBasicMaterial({ map: wordmark })
  );
  plate.position.set(-(L / 2) + 0.22, headerY, BD / 2 + 0.001);
  g.add(plate);

  // ---- top: bed underframe, thin front lip, tall black rear rail, alu ends ---
  g.add(box(L, 0.05, BD, mats.alu, 0, TOP_Y - RAIL_H - 0.005, 0)); // bed underframe
  g.add(box(L, 0.03, 0.03, mats.alu, 0, TOP_Y - 0.015, BD / 2 - 0.015)); // front lip
  g.add(box(L, RAIL_H, 0.03, mats.dark, 0, TOP_Y - RAIL_H / 2 + 0.02, -(BD / 2 - 0.015))); // rear rail
  for (const x of [-(L / 2 - 0.015), L / 2 - 0.015]) {
    g.add(box(0.03, 0.05, BD - 0.06, mats.alu, x, TOP_Y - 0.025 + 0.01, 0));
  }
  buildBed(g, cfg, mats, L, BD);

  // a populated board on the belt, sized to the width option — scale and use
  const bw = D * 0.72;
  const bl = Math.min(D * 0.6, 0.28);
  const bx0 = -L * 0.12;
  const pcb = box(bl, 0.0016, bw, mats.pcb, bx0, TOP_Y - 0.004, 0);
  pcb.castShadow = false;
  g.add(pcb);
  const sx = bl / 0.28;
  const sz = bw / 0.33;
  for (const [w, d, h, ox, oz, m] of [
    [0.05, 0.05, 0.006, -0.03, 0.02, mats.dark],
    [0.03, 0.02, 0.004, 0.04, -0.05, mats.dark],
    [0.02, 0.02, 0.01, 0.06, 0.06, mats.chain],
    [0.012, 0.045, 0.003, -0.08, -0.06, mats.dark],
    [0.02, 0.012, 0.014, 0.0, -0.1, mats.dark],
  ] as const) {
    g.add(box(w * sx, h, d * sz, m, bx0 + ox * sx, TOP_Y - 0.003 + h / 2, oz * sz));
  }
  // belt drive shaft poking out of the right rear
  g.add(cylinder(0.018, 0.12, mats.chain, L / 2 + 0.05, TOP_Y - 0.03, -(BD / 2) + 0.12, Math.PI / 2));

  // HMI on the front-right corner of the top, tilted to the operator
  const hmi = new THREE.Group();
  hmi.add(box(0.17, 0.11, 0.03, mats.panel, 0, 0, 0));
  const scr = box(0.12, 0.07, 0.004, mats.hmi, 0, 0, 0.017);
  scr.castShadow = false;
  hmi.add(scr);
  hmi.position.set(L / 2 - 0.16, TOP_Y + 0.03, BD / 2 - 0.03);
  hmi.rotation.x = -0.55;
  g.add(hmi);

  // e-stop on the rear-left corner of the top
  const ex = -(L / 2) + 0.09;
  const ez = -(BD / 2) + 0.06;
  g.add(box(0.05, 0.035, 0.05, mats.dark, ex, TOP_Y + 0.03, ez));
  g.add(cylinder(0.017, 0.02, mats.red, ex, TOP_Y + 0.055, ez));

  // the PROMATION mat on the floor in front of the station
  const matW = Math.min(L * 1.6, 1.9);
  const floorMat = new THREE.Mesh(
    new THREE.PlaneGeometry(matW, matW * 0.5),
    new THREE.MeshStandardMaterial({ map: mat, roughness: 0.95 })
  );
  floorMat.rotation.x = -Math.PI / 2;
  floorMat.position.set(0, 0.004, BD / 2 + 0.12 + matW * 0.25);
  floorMat.receiveShadow = true;
  g.add(floorMat);

  // soft contact shadow that grounds the cabinet on the slab
  const cs = new THREE.Mesh(
    new THREE.PlaneGeometry(L + 0.5, BD + 0.5),
    new THREE.MeshBasicMaterial({ map: shadow, transparent: true, opacity: 0.6, depthWrite: false })
  );
  cs.rotation.x = -Math.PI / 2;
  cs.position.y = 0.002;
  cs.renderOrder = -1;
  g.add(cs);

  // ---- gantry: rear uprights carry both the bin shelf and the light frame ---
  const upright = cfg.light || cfg.trays !== "none";
  const rows = cfg.trays === "double" ? 2 : cfg.trays === "single" ? 1 : 0;
  const shelfY = (r: number) => TOP_Y + 0.38 + r * 0.32;
  const gy = TOP_Y + 0.9; // top frame height, ~0.9 m over the worktop
  const upTop = cfg.light ? gy : shelfY(rows - 1) + 0.16;
  const uz = -(BD / 2 - POST / 2);
  if (upright) {
    for (const x of [-(L / 2 - POST / 2), L / 2 - POST / 2]) {
      const h = upTop - TOP_Y + 0.02;
      g.add(box(POST, h, POST, mats.alu, x, TOP_Y - 0.02 + h / 2, uz));
    }
  }
  if (cfg.light) {
    // rectangular top frame: rear bar, two side bars reaching forward, front bar
    const reach = BD * 0.8;
    g.add(box(L, POST, POST, mats.alu, 0, gy, uz));
    for (const x of [-(L / 2 - POST / 2), L / 2 - POST / 2]) {
      g.add(box(POST, POST, reach, mats.alu, x, gy, uz + reach / 2));
    }
    const fz = uz + reach;
    g.add(box(L, POST, POST, mats.alu, 0, gy, fz));
    // LED tube on two black clamps under the front bar
    const tubeL = Math.min(L * 0.55, 0.9);
    for (const x of [-tubeL / 2, tubeL / 2]) {
      g.add(box(0.03, 0.04, 0.05, mats.dark, x, gy - 0.04, fz));
    }
    const tube = cylinder(0.014, tubeL, mats.lightLens, 0, gy - 0.06, fz, Math.PI / 2);
    tube.castShadow = false;
    g.add(tube);
  }

  // ---- bin shelves: tipped toward the operator, long bins nose-down --------
  for (let r = 0; r < rows; r++) {
    const tilt = 0.42; // front edge low, back edge high
    const shelf = new THREE.Group();
    shelf.position.set(0, shelfY(r), uz + 0.06);
    shelf.rotation.x = tilt;
    const SHELF_D = 0.42;
    shelf.add(box(L - 0.1, 0.014, SHELF_D, mats.alu, 0, 0, 0));
    // front and rear lips of the shelf frame
    shelf.add(box(L - 0.1, 0.03, 0.02, mats.alu, 0, 0.01, SHELF_D / 2 - 0.01));
    shelf.add(box(L - 0.1, 0.03, 0.02, mats.alu, 0, 0.01, -(SHELF_D / 2 - 0.01)));
    // bins: 150 wide, 150 tall, 360 long, packed across the shelf
    const BIN_W = 0.15, BIN_H = 0.15, BIN_L = 0.36, PITCH = 0.17;
    const n = Math.max(2, Math.floor((L - 0.12) / PITCH));
    for (let i = 0; i < n; i++) {
      const bx = -((n - 1) / 2) * PITCH + i * PITCH;
      const bin = new THREE.Group();
      bin.add(box(BIN_W, BIN_H, BIN_L, mats.bin, 0, 0, 0));
      bin.add(box(BIN_W - 0.02, BIN_H - 0.01, BIN_L - 0.02, mats.binInner, 0, 0.012, 0));
      bin.position.set(bx, 0.007 + BIN_H / 2, 0.05); // noses overhang the front lip
      shelf.add(bin);
    }
    g.add(shelf);
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
    const mscr = box(0.31, 0.19, 0.004, mats.screen, 0, 0, 0.012);
    mscr.castShadow = false;
    mon.add(mscr);
    mon.position.set(sx + 0.32, TOP_Y + 0.52, 0.21);
    mon.rotation.y = -0.55;
    mon.rotation.x = -0.08;
    g.add(mon);
  }

  // ---- dimension callouts: length, belt width, worktop height -------------
  const dim = new THREE.Group();
  const lineMat = new THREE.MeshBasicMaterial({ color: 0x8fd6ff });
  const seg = (w: number, h: number, d: number, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lineMat);
    m.position.set(x, y, z);
    dim.add(m);
  };
  const TH = 0.004;
  const ly = TOP_Y + 0.02;
  const lz = BD / 2 + 0.16;
  seg(L, TH, TH, 0, ly, lz);
  seg(TH, TH, 0.06, -L / 2, ly, lz);
  seg(TH, TH, 0.06, L / 2, ly, lz);
  dim.add(labelSprite(`${Math.round(L * 1000)} mm`, 0, ly + 0.08, lz));
  const wx = L / 2 + 0.16;
  seg(TH, TH, D, wx, ly, 0);
  seg(0.06, TH, TH, wx, ly, -D / 2);
  seg(0.06, TH, TH, wx, ly, D / 2);
  dim.add(labelSprite(`${Math.round(D * 1000)} mm belt`, wx, ly + 0.08, 0));
  const hx = -L / 2 - 0.16;
  const hz = BD / 2;
  seg(TH, TOP_Y, TH, hx, TOP_Y / 2, hz);
  seg(0.06, TH, TH, hx, 0.002, hz);
  seg(0.06, TH, TH, hx, TOP_Y, hz);
  dim.add(labelSprite(`${Math.round(TOP_Y * 1000)} mm`, hx, TOP_Y / 2, hz + 0.02));
  g.add(dim);

  return g;
}

function disposeGroup(g: THREE.Object3D) {
  g.traverse((o) => {
    if (o instanceof THREE.Sprite) {
      // sprites share one module-level geometry; only the label is ours
      o.material.map?.dispose();
      o.material.dispose();
      return;
    }
    const mesh = o as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(m)) m.forEach((x) => x.dispose());
    else m?.dispose();
  });
}

// ---- component -------------------------------------------------------------

export type ViewName = "three-quarter" | "front" | "top" | "operator";

export type WorkTablePreviewHandle = {
  /** JPEG data-URL of the frame on screen right now, or null if unavailable. */
  snapshot: () => string | null;
  /** Glide the camera to a named preset. */
  setView: (v: ViewName) => void;
};

const dimsFor = (c: Config): Dims => ({ L: LENGTH_M[c.length], D: DEPTH_M[c.width] });
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function WorkTablePreview3D({
  config,
  ref,
}: {
  config: Config;
  ref?: React.Ref<WorkTablePreviewHandle>;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const configRef = useRef(config);
  const rebuildRef = useRef<(c: Config) => void>(() => undefined);
  const apiRef = useRef<WorkTablePreviewHandle>({ snapshot: () => null, setView: () => undefined });
  useImperativeHandle(
    ref,
    () => ({ snapshot: () => apiRef.current.snapshot(), setView: (v) => apiRef.current.setView(v) }),
    []
  );

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
    // Held invisible until the first frame is drawn, then faded up — the
    // scene arrives rather than flashing on.
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 600ms ease";
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

    const warehouse = buildGarage(floorTexture(), woodTexture());
    scene.add(warehouse);

    const HOME_TARGET = new THREE.Vector3(0, 0.92, 0);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(HOME_TARGET);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1.2;
    controls.maxDistance = 7.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.enablePan = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.9;

    // HDR-style output: render, bloom the emissives, then tone-map.
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), TUNE.bloomStrength, TUNE.bloomRadius, TUNE.bloomThreshold);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const wordmark = wordmarkTexture();
    const mat = matTexture();
    applyLogo(wordmark, mat);
    const tex: Tex = { wordmark, mat, shadow: contactShadowTexture() };

    let dims = dimsFor(configRef.current);
    let model = buildModel(configRef.current, dims, tex);
    scene.add(model);
    const swap = (c: Config, d: Dims) => {
      scene.remove(model);
      disposeGroup(model);
      model = buildModel(c, d, tex);
      scene.add(model);
    };

    // Keep the machine framed as its size changes — but only until the
    // visitor takes the camera; after that their view is theirs.
    const fitDist = (c: Config) => {
      const half = LENGTH_M[c.length] / 2 + (c.swingArm ? 0.85 : 0.45);
      return Math.min(7, Math.max(4.6, half * 3.0));
    };
    const fitCamera = (c: Config) => {
      const dir = camera.position.clone().sub(controls.target).normalize();
      camera.position.copy(controls.target.clone().add(dir.multiplyScalar(fitDist(c))));
    };
    fitCamera(configRef.current);

    // A size change glides rather than jumps: the frame is rebuilt each
    // frame at interpolated dimensions for ~0.4 s. Toggled parts (light,
    // trays, arm) appear at the start of the glide.
    let dimAnim: { from: Dims; to: Dims; start: number } | null = null;
    rebuildRef.current = (c: Config) => {
      const to = dimsFor(c);
      if (reduced || (to.L === dims.L && to.D === dims.D)) {
        dims = to;
        swap(c, dims);
      } else {
        dimAnim = { from: dims, to, start: performance.now() };
      }
      if (controls.autoRotate) fitCamera(c);
    };

    // Camera presets glide the same way. Any pointer on the canvas cancels
    // both the glide and the idle spin — the visitor has taken over.
    let camAnim: {
      fromP: THREE.Vector3;
      toP: THREE.Vector3;
      fromT: THREE.Vector3;
      toT: THREE.Vector3;
      start: number;
    } | null = null;
    const takeOver = () => {
      controls.autoRotate = false;
      camAnim = null;
    };
    renderer.domElement.addEventListener("pointerdown", takeOver);

    apiRef.current.setView = (v) => {
      controls.autoRotate = false;
      const c = configRef.current;
      const dist = fitDist(c);
      const BD = dims.D + 0.2;
      let toP: THREE.Vector3;
      let toT = HOME_TARGET.clone();
      switch (v) {
        case "front":
          toP = new THREE.Vector3(0, 1.45, dist);
          break;
        case "top":
          toP = new THREE.Vector3(0, 0.92 + dist * 0.9, 0.001);
          break;
        case "operator":
          // eye height, standing at the belt
          toP = new THREE.Vector3(0, 1.62, BD / 2 + 0.8);
          toT = new THREE.Vector3(0, TOP_Y + 0.05, -0.15);
          break;
        default:
          toP = new THREE.Vector3(2.7, 0.98, 3.1).normalize().multiplyScalar(dist).add(HOME_TARGET);
      }
      camAnim = {
        fromP: camera.position.clone(),
        toP,
        fromT: controls.target.clone(),
        toT,
        start: performance.now(),
      };
    };

    apiRef.current.snapshot = () => {
      try {
        // Draw and read back in the same tick, so no preserveDrawingBuffer.
        composer.render();
        return renderer.domElement.toDataURL("image/jpeg", 0.82);
      } catch {
        return null;
      }
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
    let shown = false;
    const loop = () => {
      const now = performance.now();
      if (dimAnim) {
        const t = Math.min(1, (now - dimAnim.start) / 420);
        const e = easeInOut(t);
        dims = { L: lerp(dimAnim.from.L, dimAnim.to.L, e), D: lerp(dimAnim.from.D, dimAnim.to.D, e) };
        swap(configRef.current, dims);
        if (t >= 1) dimAnim = null;
      }
      if (camAnim) {
        const t = Math.min(1, (now - camAnim.start) / 700);
        const e = easeInOut(t);
        camera.position.lerpVectors(camAnim.fromP, camAnim.toP, e);
        controls.target.lerpVectors(camAnim.fromT, camAnim.toT, e);
        if (t >= 1) camAnim = null;
      }
      controls.update();
      composer.render();
      if (!shown) {
        shown = true;
        requestAnimationFrame(() => (renderer.domElement.style.opacity = "1"));
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", takeOver);
      controls.dispose();
      disposeGroup(model);
      disposeGroup(warehouse);
      wordmark.dispose();
      mat.dispose();
      tex.shadow.dispose();
      composer.dispose();
      pmrem.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
      rebuildRef.current = () => undefined;
      apiRef.current = { snapshot: () => null, setView: () => undefined };
    };
  }, []);

  useEffect(() => {
    configRef.current = config;
    rebuildRef.current(config);
  }, [config]);

  // Fills its container — the page decides how much of the screen the
  // environment gets, and the resize observer follows.
  return <div ref={hostRef} className="h-full w-full" aria-label="3D model of the configured work table in a wood-slat showroom bay" role="img" />;
}
