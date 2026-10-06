import { useCallback, useState } from "react";
import { Rise } from "@/components/scroll/Rise";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { galleryOrder, photos } from "@/content/photos";
import type { PhotoId } from "@/content/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { FilmStrip } from "./FilmStrip";
import { Lightbox } from "./Lightbox";
import { PhotoTile } from "./PhotoTile";

export function GallerySection() {
  const [openId, setOpenId] = useState<PhotoId | null>(null);
  const filmStrip = useMediaQuery(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  );

  const step = useCallback((direction: 1 | -1) => {
    setOpenId((current) => {
      if (!current) return current;
      const index = galleryOrder.indexOf(current);
      const next = (index + direction + galleryOrder.length) % galleryOrder.length;
      return galleryOrder[next] ?? current;
    });
  }, []);

  const heading = (
    <SectionHeading
      id="gallery-title"
      eyebrow="Gallery"
      title={
        <>
          Catch the <Highlight>Mood</Highlight>.
        </>
      }
      lede={filmStrip ? "Keep scrolling. Tap any shot to see it full size." : undefined}
      className="md:mb-10"
    />
  );

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-bg-raised">
      {filmStrip ? (
        <FilmStrip heading={heading} onOpen={setOpenId} />
      ) : (
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          {heading}
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5">
            {galleryOrder.map((id, i) => (
              <li key={id} className={cn("md:col-span-2", i < 2 && "col-span-2 md:col-span-3")}>
                <Rise>
                  <PhotoTile
                    photo={photos[id]}
                    onOpen={() => {
                      setOpenId(id);
                    }}
                    className="aspect-[4/5]"
                  />
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      )}
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
