import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { motion } from "motion/react";
import { useState } from "react";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { JoinSides } from "@/components/scroll/JoinSides";
import { IconButton } from "@/components/ui/IconButton";
import { socials } from "@/content/brand";
import type { Video } from "@/content/types";
import { videos } from "@/content/videos";
import { stagger } from "@/lib/motion";
import { ReelCard } from "./ReelCard";
import { VideoPlayer } from "./VideoPlayer";

const instagram = socials[0];

export function VideosSection() {
  const [playing, setPlaying] = useState<Video | null>(null);

  return (
    <section
      id="videos"
      aria-labelledby="videos-title"
      className="relative mx-auto max-w-6xl px-5 pt-36 pb-24 md:px-8"
    >
      <JoinSides
        className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]"
        left={
          <div>
            <SectionHeading
              id="videos-title"
              eyebrow="Mood in motion"
              title={
                <>
                  Photos don't do it <Highlight>justice</Highlight>.
                </>
              }
              lede="Lights, art, bass and the people. Tap a clip to watch it with sound."
              className="mb-8 md:mb-8"
            />
            {instagram && (
              <IconButton
                href={`${instagram.href}reels/`}
                external
                label={`More videos on Instagram, ${instagram.handle}`}
                size="lg"
                icon={<InstagramIcon />}
              />
            )}
          </div>
        }
        right={
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pt-2 pb-8 has-[figure:only-child]:justify-center md:mx-0"
          >
            {videos.map((video) => (
              <ReelCard key={video.id} video={video} onOpen={setPlaying} />
            ))}
          </motion.div>
        }
      />
      <VideoPlayer
        video={playing}
        onClose={() => {
          setPlaying(null);
        }}
      />
    </section>
  );
}
