import { motion } from "motion/react";
import { Modal } from "@/components/ui/Modal";
import type { Photo } from "@/content/types";

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
}

/** The photo grows out of its tile into a full-screen view. */
export function Lightbox({ photo, onClose }: LightboxProps) {
  return (
    <Modal open={photo !== null} onClose={onClose} label={photo?.caption ?? "Photo"}>
      {photo && (
        <figure className="flex flex-col items-center">
          <motion.img
            layoutId={`photo-${photo.id}`}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="max-h-[80svh] w-auto rounded-3xl border-4 border-ink object-contain"
          />
          <motion.figcaption
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="mt-4 text-center text-atmos-white/80"
          >
            {photo.caption}
            {photo.credit && ` · 📸 ${photo.credit}`}
          </motion.figcaption>
        </figure>
      )}
    </Modal>
  );
}
