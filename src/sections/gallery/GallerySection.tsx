import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { galleryOrder, photos } from "@/content/photos";
import type { PhotoId } from "@/content/types";
import { cn } from "@/lib/cn";
import { fadeUp, stagger } from "@/lib/motion";
import { Lightbox } from "./Lightbox";

export function GallerySection() {
  const [openId, setOpenId] = useState<PhotoId | null>(null);

  const step = useCallback((direction: 1 | -1) => {
    setOpenId((current) => {
      if (!current) return current;
      const index = galleryOrder.indexOf(current);
      const next = (index + direction + galleryOrder.length) % galleryOrder.length;
      return galleryOrder[next] ?? current;
    });
  }, []);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-bg-raised py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title={
            <>
              Catch the <Highlight>Mood</Highlight>.
            </>
          }
        />
        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5"
        >
          {galleryOrder.map((id, i) => {
            const photo = photos[id];
            return (
              <motion.li
                key={id}
                variants={fadeUp}
                className={cn("md:col-span-2", i < 2 && "col-span-2 md:col-span-3")}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenId(id);
                  }}
                  aria-label={`View larger: ${photo.caption}`}
                  className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-3xl border-4 border-ink"
                >
                  <motion.img
                    layoutId={`photo-${id}`}
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full border-2 border-ink bg-smiley px-3 py-1 text-xs font-bold text-ink">
                    {photo.caption}
                    {photo.credit && ` · 📸 ${photo.credit}`}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
      <Lightbox
        photo={openId ? photos[openId] : null}
        onClose={() => {
          setOpenId(null);
        }}
        onStep={step}
      />
    </section>
  );
}
