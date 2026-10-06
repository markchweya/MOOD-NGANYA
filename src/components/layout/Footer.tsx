import { WindshieldSticker } from "@/components/brand/stickers/WindshieldSticker";
import { NoRiskSticker } from "@/components/brand/stickers/NoRiskSticker";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/content/photos";

const credits = [...new Set(Object.values(photos).flatMap((p) => (p.credit ? [p.credit] : [])))];

export function Footer() {
  return (
    <footer className="border-t-4 border-mood-purple px-5 pt-16 pb-32 text-center">
      <Reveal className="mx-auto grid max-w-md justify-items-center gap-5">
        <WindshieldSticker role="img" aria-label="MOOD" className="h-auto w-72" />
        <NoRiskSticker className="h-auto w-56" />
        <p className="text-sm text-fg-muted">
          © {new Date().getFullYear()} MOOD · Photos: {credits.join(", ")} · Nairobi 🇰🇪
        </p>
      </Reveal>
    </footer>
  );
}
