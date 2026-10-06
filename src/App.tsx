import { Dock } from "@/components/layout/Dock";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/sections/hero/Hero";
import { Ticker } from "@/sections/ticker/Ticker";

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
      </main>
      <Dock />
    </>
  );
}
