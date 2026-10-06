import { NoRiskSticker } from "@/components/brand/stickers/NoRiskSticker";
import { WindshieldSticker } from "@/components/brand/stickers/WindshieldSticker";
import { JoinSides } from "@/components/scroll/JoinSides";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/content/photos";

const credits = [...new Set(Object.values(photos).flatMap((p) => (p.credit ? [p.credit] : [])))];

/** The windshield logo and motto slide in from opposite sides and meet in the middle. */
export function Footer() {
  return (
    <footer className="overflow-x-clip border-t-4 border-mood-purple px-5 pt-16 pb-32 text-center">
      <JoinSides
        className="mx-auto grid max-w-md justify-items-center gap-5"
        left={<WindshieldSticker role="img" aria-label="MOOD" className="mx-auto h-auto w-72" />}
        right={<NoRiskSticker className="mx-auto h-auto w-56" />}
      />
      <Reveal>
        <p className="mt-5 text-sm text-fg-muted">
          © {new Date().getFullYear()} MOOD · Photos: {credits.join(", ")} · Nairobi 🇰🇪
        </p>
      </Reveal>
    </footer>
  );
}
