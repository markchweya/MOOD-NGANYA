import { motion } from "motion/react";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { palette } from "@/content/palette";
import { stagger } from "@/lib/motion";
import { SwatchCard } from "./SwatchCard";

export function PaletteSection() {
  return (
    <section id="colours" aria-labelledby="colours-title" className="bg-bg-raised py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="colours-title"
          eyebrow="The palette"
          title={
            <>
              Every colour, <Highlight>to the detail</Highlight>.
            </>
          }
          lede="Measured straight off the matatu. Each chip shows exactly where the colour lives. Tap a swatch to copy it."
        />
        <div className="grid gap-14">
          {palette.map((group) => (
            <div key={group.name}>
              <h3 className="mb-5 font-display text-sm tracking-[0.2em] text-fg-muted uppercase">
                {group.name}
              </h3>
              <motion.div
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
              >
                {group.swatches.map((swatch) => (
                  <SwatchCard key={swatch.hex} swatch={swatch} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
