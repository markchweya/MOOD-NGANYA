import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { BusStudio } from "./bus/BusStudio";

export function PaletteSection() {
  return (
    <section
      id="colours"
      aria-labelledby="colours-title"
      className="overflow-x-clip bg-bg-raised py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="colours-title"
          eyebrow="The palette"
          title={
            <>
              Every colour, <Highlight>to the detail</Highlight>.
            </>
          }
          lede="Measured straight off the matatu. Spin the bus, tap a dot, and see exactly where each colour lives."
        />
        <BusStudio />
      </div>
    </section>
  );
}
