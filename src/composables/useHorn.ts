import { onBeforeUnmount } from "vue";

/** Two detuned sawtooth tones through a low-pass filter: a matatu's dual horn. */
const TONES_HZ = [415, 523];
const BLASTS: readonly (readonly [start: number, length: number])[] = [
  [0, 0.18],
  [0.26, 0.42],
];

/** Returns a function that plays a double hoot. No audio files needed. */
export function useHorn(): () => void {
  let context: AudioContext | null = null;

  onBeforeUnmount(() => {
    void context?.close();
  });

  return () => {
    context ??= new AudioContext();
    const now = context.currentTime;

    for (const [offset, length] of BLASTS) {
      const start = now + offset;
      const end = start + length;

      const gain = context.createGain();
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
      gain.gain.setValueAtTime(0.18, end - 0.05);
      gain.gain.linearRampToValueAtTime(0, end);

      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2200;
      filter.connect(gain).connect(context.destination);

      for (const frequency of TONES_HZ) {
        const osc = context.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.value = frequency;
        osc.connect(filter);
        osc.start(start);
        osc.stop(end);
      }
    }
  };
}
