import { Dock } from "@/components/layout/Dock";
import { Header } from "@/components/layout/Header";
import { DetailsSection } from "@/sections/details/DetailsSection";
import { FamilySection } from "@/sections/family/FamilySection";
import { GallerySection } from "@/sections/gallery/GallerySection";
import { Hero } from "@/sections/hero/Hero";
import { PaletteSection } from "@/sections/palette/PaletteSection";
import { StickersSection } from "@/sections/stickers/StickersSection";
import { Ticker } from "@/sections/ticker/Ticker";
import { VideosSection } from "@/sections/videos/VideosSection";

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <VideosSection />
        <DetailsSection />
        <PaletteSection />
        <StickersSection />
        <GallerySection />
        <FamilySection />
      </main>
      <Dock />
    </>
  );
}
