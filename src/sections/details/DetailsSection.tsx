import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Explorer } from "./Explorer";

export function DetailsSection() {
  return (
    <section
      id="details"
      aria-labelledby="details-title"
      className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
    >
      <SectionHeading
        id="details-title"
        eyebrow="Spot the details"
        title={
          <>
            Every inch <Highlight>says something</Highlight>.
          </>
        }
        lede="Pick an angle, then tap the numbers."
      />
      <Reveal amount={0.1}>
        <Explorer />
      </Reveal>
    </section>
  );
}
