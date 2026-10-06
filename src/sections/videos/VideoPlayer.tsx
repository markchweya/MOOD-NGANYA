import { motion } from "motion/react";
import { Modal } from "@/components/ui/Modal";
import type { Video } from "@/content/types";
import { publicUrl } from "@/lib/publicUrl";
import { VideoSources } from "./VideoSources";

interface VideoPlayerProps {
  video: Video | null;
  onClose: () => void;
}

/** Full-screen player that grows out of the reel card and plays with sound. */
export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  return (
    <Modal open={video !== null} onClose={onClose} label={video?.caption ?? "Video"}>
      {video && (
        <motion.div
          layoutId={`reel-${video.id}`}
          className="overflow-hidden rounded-[28px] border-4 border-ink bg-ink"
          style={{ aspectRatio: `${video.width} / ${video.height}`, height: "min(86svh, 900px)" }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- street ambience and music, no speech to caption */}
          <video
            poster={publicUrl(video.poster)}
            autoPlay
            controls
            playsInline
            className="size-full object-cover"
          >
            <VideoSources video={video} />
          </video>
        </motion.div>
      )}
    </Modal>
  );
}
