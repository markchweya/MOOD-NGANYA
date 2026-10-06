import { galleryOrder, photos } from "@/content/photos";

/**
 * A level, slow-drifting reel of Mood's photos between the hero and the videos.
 * Pure CSS animation; pauses on hover and stops for reduced-motion visitors.
 */
export function PhotoReel() {
  const strip = galleryOrder.map((id) => photos[id]);

  return (
    <div
      aria-hidden
      className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] py-10"
    >
      <div className="flex w-max animate-[reel_60s_linear_infinite] gap-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...strip, ...strip].map((photo, i) => (
          <img
            key={`${photo.id}-${String(i)}`}
            src={photo.src}
            alt=""
            loading="lazy"
            className="h-44 w-36 shrink-0 rounded-2xl border border-line object-cover opacity-80 transition-opacity duration-500 hover:opacity-100 md:h-56 md:w-44"
          />
        ))}
      </div>
    </div>
  );
}
