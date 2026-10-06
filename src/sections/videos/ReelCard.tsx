import { Play } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import type { Video } from "@/content/types";
import { useTilt } from "@/hooks/useTilt";
import { fadeUp } from "@/lib/motion";
import { publicUrl } from "@/lib/publicUrl";
import { VideoSources } from "./VideoSources";

interface ReelCardProps {
  video: Video;
  onOpen: (video: Video) => void;
}

/** Vertical clip that plays silently while on screen; tap to open it with sound. */
export function ReelCard({ video, onOpen }: ReelCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const tilt = useTilt(8);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) void el.play().catch(() => undefined);
    else el.pause();
  }, [inView]);

  return (
    <motion.figure variants={fadeUp} className="w-[min(320px,78vw)] shrink-0 snap-center">
      <motion.button
        type="button"
        layoutId={`reel-${video.id}`}
        onClick={() => {
          onOpen(video);
        }}
        aria-label={`Play with sound: ${video.caption}`}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.97 }}
        className="group relative block w-full overflow-hidden rounded-[28px] border-4 border-ink bg-ink shadow-slab"
        style={{
          aspectRatio: `${video.width} / ${video.height}`,
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformPerspective: 900,
        }}
      >
        <video
          ref={ref}
          poster={publicUrl(video.poster)}
          muted
          loop
          playsInline
          preload="none"
          className="size-full object-cover"
        >
          <VideoSources video={video} />
        </video>
        <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30">
          <span className="grid size-16 scale-75 place-items-center rounded-full border-2 border-ink bg-smiley text-ink opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
            <Play className="ml-1 size-7 fill-current" />
          </span>
        </span>
      </motion.button>
      <figcaption className="mt-5 font-semibold">
        {video.caption}
        {video.credit && (
          <small className="mt-1 block font-normal text-fg-muted">{video.credit}</small>
        )}
      </figcaption>
    </motion.figure>
  );
}
