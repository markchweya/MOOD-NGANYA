import { motion } from "motion/react";
import type { Photo } from "@/content/types";
import { cn } from "@/lib/cn";

interface PhotoTileProps {
  photo: Photo;
  onOpen: () => void;
  className?: string;
}

/** A photo card; its image morphs into the lightbox through a shared layoutId. */
export function PhotoTile({ photo, onOpen, className }: PhotoTileProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${photo.caption}`}
      className={cn(
        "group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl border-4 border-ink",
        className,
      )}
    >
      <motion.img
        layoutId={`photo-${photo.id}`}
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
  );
}
