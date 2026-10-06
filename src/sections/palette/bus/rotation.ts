import { useMotionValue, useSpring } from "motion-v";
import { readonly, ref } from "vue";
import type { BusFace } from "@/content/types";

/** Degrees of turn per pixel dragged. */
const DRAG_RATIO = 0.45;

/** Which face is toward the viewer at a given angle. */
export function faceAt(angle: number): BusFace {
  const normalised = ((angle % 360) + 360) % 360;
  return normalised > 90 && normalised < 270 ? "back" : "front";
}

/**
 * Drag to spin the bus around its vertical axis; on release it springs to the
 * nearest face. `showFace` and `turn` rotate the short way round.
 */
export function useBusRotation() {
  const target = useMotionValue(0);
  const rotateY = useSpring(target, { stiffness: 140, damping: 20 });
  const face = ref<BusFace>("front");
  let drag: { startX: number; startAngle: number } | null = null;

  function settle(angle: number) {
    const snapped = Math.round(angle / 180) * 180;
    target.set(snapped);
    face.value = faceAt(snapped);
  }

  function showFace(next: BusFace) {
    if (faceAt(target.get()) !== next) settle(target.get() + 180);
  }

  function turn() {
    settle(target.get() + 180);
  }

  function end(event: PointerEvent) {
    if (!drag) return;
    drag = null;
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    settle(target.get());
  }

  const dragHandlers = {
    onPointerdown(event: PointerEvent) {
      if ((event.target as Element).closest("button")) return; // let colour dots be clicked
      drag = { startX: event.clientX, startAngle: target.get() };
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    },
    onPointermove(event: PointerEvent) {
      if (!drag) return;
      const angle = drag.startAngle + (event.clientX - drag.startX) * DRAG_RATIO;
      target.set(angle);
      face.value = faceAt(angle);
    },
    onPointerup: end,
    onPointercancel: end,
  };

  return { rotateY, face: readonly(face), showFace, turn, dragHandlers };
}
