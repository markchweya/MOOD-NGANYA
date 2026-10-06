import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import type { Photo } from "@/content/types";

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
}

/** The photo grows out of its tile into a full-screen view. */
export function Lightbox({ photo, onClose, onStep }: LightboxProps) {
  const isOpen = photo !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onStep]);

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
          <div className="mt-4 flex gap-3">
            <IconButton
              label="Previous photo"
              tooltip="none"
              icon={<ChevronLeft />}
              onClick={() => {
                onStep(-1);
              }}
            />
            <IconButton
              label="Next photo"
              tooltip="none"
              icon={<ChevronRight />}
              onClick={() => {
                onStep(1);
              }}
            />
          </div>
        </figure>
      )}
    </Modal>
  );
}
