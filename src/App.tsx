import { useState } from "react";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { Dock } from "@/components/layout/Dock";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { DetailsSection } from "@/sections/details/DetailsSection";
import { FamilySection } from "@/sections/family/FamilySection";
import { GallerySection } from "@/sections/gallery/GallerySection";
import { Intro } from "@/features/intro/Intro";
import { shouldPlayIntro } from "@/features/intro/intro";
import { Hero } from "@/sections/hero/Hero";
import { PaletteSection } from "@/sections/palette/PaletteSection";
import { PhotoReel } from "@/sections/reel/PhotoReel";
import { StickersSection } from "@/sections/stickers/StickersSection";
import { VideosSection } from "@/sections/videos/VideosSection";

export function App() {
  const [ready, setReady] = useState(() => !shouldPlayIntro());

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[90] rounded-full border-2 border-ink bg-smiley px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero ready={ready} />
        <PhotoReel />
        <VideosSection />
        <DetailsSection />
        <PaletteSection />
        <StickersSection />
        <GallerySection />
        <FamilySection />
      </main>
      <Footer />
      <Dock />
      <CursorFollower />
      {!ready && (
        <Intro
          onDone={() => {
            setReady(true);
          }}
        />
      )}
    </>
  );
}
