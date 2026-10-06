import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { Rise } from "@/components/scroll/Rise";
import { StickerWall } from "./StickerWall";

export function StickersSection() {
  return (
    <section
      id="stickers"
      aria-labelledby="stickers-title"
      className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
    >
      <SectionHeading
        id="stickers-title"
        eyebrow="Sticker wall"
        title={
          <>
            Slap it <Highlight>on the panel</Highlight>.
          </>
        }
        lede="Every sticker on Mood, redrawn. Drag them around and make your own panel."
      />
      <Rise>
        <StickerWall />
      </Rise>
    </section>
  );
}
