import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { galleryOrder, photos } from "@/content/photos";
import type { PhotoId } from "@/content/types";
import { useElementWidth } from "@/hooks/useElementWidth";
import { PhotoTile } from "./PhotoTile";

interface FilmStripProps {
  heading: ReactNode;
  onOpen: (id: PhotoId) => void;
}

/**
 * Desktop gallery: the section pins while vertical scroll slides the photos
 * sideways like a film strip, stopping exactly at the last photo.
 */
export function FilmStrip({ heading, onOpen }: FilmStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackWidth = useElementWidth(trackRef);
  const viewportWidth = useElementWidth(viewportRef);
  const distance = Math.max(0, trackWidth - viewportWidth);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  return (
    <div ref={ref} className="relative h-[280vh]">
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pb-24"
      >
        <div className="mx-auto w-full max-w-6xl px-8">{heading}</div>
        <motion.ul
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-6 px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          {galleryOrder.map((id) => (
            <li key={id} className="aspect-[4/5] h-[min(56svh,36rem)] shrink-0">
              <PhotoTile
                photo={photos[id]}
                onOpen={() => {
                  onOpen(id);
                }}
                className="h-full"
              />
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
