import { BUS, type Vec3 } from "./busGeometry";

/**
 * The garage's floor plan in metres, sized like a real bus workshop so the
 * camera can stand far enough back to frame the whole of MOOD on any screen.
 * The turntable sits at the origin; the street is towards +z.
 */
export const ROOM = { halfWidth: 15, back: -16, front: 12, height: 6.6 } as const;

/** The doorway in the front wall, and the shutter that closes it. */
export const OPENING = { width: 16, height: 6, z: ROOM.front } as const;
export const DOOR_Z = ROOM.front - 0.15;

/** Radius of a sphere around the bus, roof lights and mirrors included. */
export const BUS_RADIUS = Math.hypot(BUS.length / 2, BUS.faceHeight / 2, BUS.width / 2 + 0.4);

/** Where the camera looks: the middle of the bus. */
export const BUS_CENTRE: Vec3 = [0, 1.55, 0];

/** Vertical field of view: wider on tall, narrow screens so the bus still fits. */
export function fieldOfView(aspect: number): number {
  return aspect < 1 ? 50 : 40;
}

/** How far back the camera must stand for a sphere of `radius` to fill the frame. */
export function fitDistance(aspect: number, fovDegrees: number, radius = BUS_RADIUS): number {
  const vertical = (fovDegrees * Math.PI) / 180;
  const horizontal = 2 * Math.atan(Math.tan(vertical / 2) * aspect);
  return radius / Math.sin(Math.min(vertical, horizontal) / 2);
}

/** The farthest the orbiting camera may stand, so it never passes through a wall. */
export const MAX_DISTANCE = 14.5;

/** Camera distance that frames the whole bus, within the room. */
export function showroomDistance(aspect: number): number {
  return Math.min(MAX_DISTANCE, fitDistance(aspect, fieldOfView(aspect)) * 1.05);
}

/** The showroom view: three-quarters from the front, framed to fit. */
export function showroomEye(aspect: number): Vec3 {
  const [dx, dy, dz] = [0.66, 0.22, 0.72];
  const k = showroomDistance(aspect) / Math.hypot(dx, dy, dz);
  return [BUS_CENTRE[0] + dx * k, BUS_CENTRE[1] + dy * k, BUS_CENTRE[2] + dz * k];
}

/** Outside on the street, square on to the shutter. */
export function streetEye(aspect: number): Vec3 {
  const fov = fieldOfView(aspect);
  return [0, OPENING.height / 2, DOOR_Z + fitDistance(aspect, fov, OPENING.width / 2) * 0.8];
}
