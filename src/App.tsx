import { Dock } from "@/components/layout/Dock";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/sections/hero/Hero";

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Dock />
    </>
  );
}
