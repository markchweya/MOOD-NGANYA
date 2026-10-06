import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { useCallback, useRef, useState, type PointerEvent } from "react";
import type { BusFace } from "@/content/types";

/** Degrees of turn per pixel dragged. */
const DRAG_RATIO = 0.45;

interface BusRotation {
  rotateY: MotionValue<number>;
  face: BusFace;
  showFace: (face: BusFace) => void;
  turn: () => void;
  dragHandlers: {
    onPointerDown: (event: PointerEvent<HTMLElement>) => void;
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerUp: (event: PointerEvent<HTMLElement>) => void;
    onPointerCancel: (event: PointerEvent<HTMLElement>) => void;
  };
}

/** Which face is toward the viewer at a given angle. */
export function faceAt(angle: number): BusFace {
  const normalised = ((angle % 360) + 360) % 360;
  return normalised > 90 && normalised < 270 ? "back" : "front";
}

/**
 * Drag to spin the bus around its vertical axis; on release it springs to the
 * nearest face. `showFace` and `turn` rotate the short way round.
 */
export function useBusRotation(): BusRotation {
  const target = useMotionValue(0);
  const rotateY = useSpring(target, { stiffness: 140, damping: 20 });
  const [face, setFace] = useState<BusFace>("front");
  const drag = useRef<{ startX: number; startAngle: number } | null>(null);

  const settle = useCallback(
    (angle: number) => {
      const snapped = Math.round(angle / 180) * 180;
      target.set(snapped);
      setFace(faceAt(snapped));
    },
    [target],
  );

  const showFace = useCallback(
    (next: BusFace) => {
      if (faceAt(target.get()) === next) return;
      settle(target.get() + 180);
    },
    [settle, target],
  );

  const turn = useCallback(() => {
    settle(target.get() + 180);
  }, [settle, target]);

  const end = (event: PointerEvent<HTMLElement>) => {
    if (!drag.current) return;
    drag.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
    settle(target.get());
  };

  return {
    rotateY,
    face,
    showFace,
    turn,
    dragHandlers: {
      onPointerDown: (event) => {
        if ((event.target as Element).closest("button")) return; // let colour dots be clicked
        drag.current = { startX: event.clientX, startAngle: target.get() };
        event.currentTarget.setPointerCapture(event.pointerId);
      },
      onPointerMove: (event) => {
        if (!drag.current) return;
        const angle = drag.current.startAngle + (event.clientX - drag.current.startX) * DRAG_RATIO;
        target.set(angle);
        setFace(faceAt(angle));
      },
      onPointerUp: end,
      onPointerCancel: end,
    },
  };
}
