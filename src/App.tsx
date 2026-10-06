import { Dock } from "@/components/layout/Dock";
import { Header } from "@/components/layout/Header";
import { DetailsSection } from "@/sections/details/DetailsSection";
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
      </main>
      <Dock />
    </>
  );
}
