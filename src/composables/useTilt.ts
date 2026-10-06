import { useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion-v";

function relativePointer(event: PointerEvent): { x: number; y: number } | null {
  const el = event.currentTarget;
  if (event.pointerType !== "mouse" || !(el instanceof HTMLElement)) return null;
  const rect = el.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) / rect.width,
    y: (event.clientY - rect.top) / rect.height,
  };
}

/** Tilt an element toward a mouse pointer by up to `maxDeg`, with a moving glare. */
export function useTilt(maxDeg = 10) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 220, damping: 20 });
  const sy = useSpring(py, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(sy, [0, 1], [maxDeg, -maxDeg]);
  const rotateY = useTransform(sx, [0, 1], [-maxDeg, maxDeg]);
  const gx = useTransform(sx, (v) => `${String(v * 100)}%`);
  const gy = useTransform(sy, (v) => `${String(v * 100)}%`);
  /** Radial highlight that follows the pointer, for a `background` layer. */
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.35), transparent 55%)`;

  return {
    rotateX,
    rotateY,
    glare,
    onPointerMove(event: PointerEvent) {
      const point = relativePointer(event);
      if (!point) return;
      px.set(point.x);
      py.set(point.y);
    },
    onPointerLeave() {
      px.set(0.5);
      py.set(0.5);
    },
  };
}
