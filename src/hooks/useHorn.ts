import { useCallback, useEffect, useRef } from "react";

/** Two detuned sawtooth tones through a low-pass filter: a matatu's dual horn. */
const TONES_HZ = [415, 523];
const BLASTS: readonly (readonly [start: number, length: number])[] = [
  [0, 0.18],
  [0.26, 0.42],
];

/** Returns a function that plays a double hoot. No audio files needed. */
export function useHorn(): () => void {
  const context = useRef<AudioContext | null>(null);

  useEffect(
    () => () => {
      void context.current?.close();
    },
    [],
  );

  return useCallback(() => {
    context.current ??= new AudioContext();
    const ctx = context.current;
    const now = ctx.currentTime;

    for (const [offset, length] of BLASTS) {
      const start = now + offset;
      const end = start + length;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
      gain.gain.setValueAtTime(0.18, end - 0.05);
      gain.gain.linearRampToValueAtTime(0, end);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2200;
      filter.connect(gain).connect(ctx.destination);

      for (const frequency of TONES_HZ) {
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.value = frequency;
        osc.connect(filter);
        osc.start(start);
        osc.stop(end);
      }
    }
  }, []);
}
