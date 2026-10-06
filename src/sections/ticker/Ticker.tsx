import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Fragment, useRef } from "react";
import { Smiley } from "@/components/brand/Smiley";
import { tickerLines } from "@/content/brand";
import { wrap } from "@/lib/wrap";

const BASE_SPEED = 2.2; // % of one copy per second

/** Bio lines on purple paint. Drifts on its own and surges with scroll speed. */
export function Ticker() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * BASE_SPEED * (delta / 1000);
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    move += direction.current * move * b;
    baseX.set(baseX.get() - move);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const line = (
    <>
      {tickerLines.map((text, i) => (
        <Fragment key={text}>
          <span className={i % 2 ? "text-tryme-gold" : undefined}>{text}</span>
          <Smiley variant={i % 2 ? "melting" : "dead"} className="h-9 w-auto shrink-0" />
        </Fragment>
      ))}
    </>
  );

  return (
    <div
      aria-hidden
      className="relative z-10 -my-6 -rotate-2 overflow-hidden border-y-4 border-ink bg-mood-purple py-4"
    >
      <motion.div
        style={{ x }}
        className="flex w-max items-center gap-8 pr-8 font-display text-2xl whitespace-nowrap text-atmos-white uppercase md:text-3xl"
      >
        {line}
        {line}
      </motion.div>
    </div>
  );
}
