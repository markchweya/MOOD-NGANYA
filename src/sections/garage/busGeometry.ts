import type { GarageFace } from "@/content/types";

/**
 * MOOD's proportions in metres, roughly an Isuzu NQR 33-seater. The front and
 * back are the photo cutouts standing on planes; the body between them is
 * modelled. Everything that places a mesh or a hotspot reads from here.
 */
export const BUS = {
  /** Body shell, without mirrors, roof lights or bumpers. */
  width: 2.3,
  length: 7.4,
  bodyBottom: 0.45,
  roof: 3.0,
  /** The cutouts run from the bumper's lower edge to the top of the light bar. */
  faceBottom: 0.22,
  faceHeight: 3.36,
  /** Width over height of each cutout, so the photos are never stretched. */
  frontAspect: 2328 / 2502,
  backAspect: 2123 / 2660,
  /** The side panel hotspots are measured over (the photographed left side, -x), ground to the top of the beacons. */
  sideHeight: 3.2,
  wheel: { radius: 0.48, width: 0.32, track: 1.02, frontAxle: 2.37, rearAxle: -2.0 },
} as const;

export const FRONT_Z = BUS.length / 2;
export const BACK_Z = -BUS.length / 2;
export const FRONT_WIDTH = BUS.faceHeight * BUS.frontAspect;
export const BACK_WIDTH = BUS.faceHeight * BUS.backAspect;
/** Centre of the face planes, measured up from the ground. */
export const FACE_CENTRE_Y = BUS.faceBottom + BUS.faceHeight / 2;

export type Vec3 = [x: number, y: number, z: number];

export interface Anchor {
  position: Vec3;
  /** Outward unit normal: a hotspot is visible when the camera is on this side. */
  normal: Vec3;
}

/** Hotspots float just proud of the surface so they never z-fight with it. */
const LIFT = 0.03;

/** Where a hotspot given as percentages across and down a face sits on the 3D bus. */
export function faceAnchor(face: GarageFace, x: number, y: number): Anchor {
  const u = x / 100;
  const v = y / 100;
  const faceY = BUS.faceBottom + BUS.faceHeight * (1 - v);

  switch (face) {
    case "front":
      return { position: [(u - 0.5) * FRONT_WIDTH, faceY, FRONT_Z + LIFT], normal: [0, 0, 1] };
    case "back":
      // The back plane is turned to face -z, which mirrors its x axis.
      return { position: [(0.5 - u) * BACK_WIDTH, faceY, BACK_Z - LIFT], normal: [0, 0, -1] };
    case "side":
      // The photographed side: the bus's left as seen from the front, at -x.
      return {
        position: [-(BUS.width / 2 + LIFT), BUS.sideHeight * (1 - v), FRONT_Z - u * BUS.length],
        normal: [-1, 0, 0],
      };
  }
}

/** Whether a surface with this anchor faces a camera at `eye`. */
export function facesCamera(anchor: Anchor, eye: Vec3): boolean {
  const [px, py, pz] = anchor.position;
  const [nx, ny, nz] = anchor.normal;
  return (eye[0] - px) * nx + (eye[1] - py) * ny + (eye[2] - pz) * nz > 0;
}
