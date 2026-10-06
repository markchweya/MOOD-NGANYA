import { motion } from "motion/react";
import { Smiley } from "@/components/brand/Smiley";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { JoinSides } from "@/components/scroll/JoinSides";
import { IconButton } from "@/components/ui/IconButton";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { manifesto, socials } from "@/content/brand";
import { easeOut } from "@/lib/motion";

/** Each word of a line drops in after the one before. */
function WordByWord({ text, index }: { text: string; index: number }) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      transition={{ staggerChildren: 0.06, delayChildren: index * 0.15 }}
      className="font-hand text-3xl leading-tight md:text-5xl"
      style={{ rotate: index % 2 ? 1.5 : -1.5 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${String(i)}`}
          variants={{
            hidden: { opacity: 0, y: 24, rotate: -6 },
            show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: easeOut } },
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function FamilySection() {
  return (
    <section
      id="family"
      aria-labelledby="family-title"
      className="relative mx-auto max-w-4xl px-5 py-28 text-center md:py-40"
    >
      <motion.div
        initial={{ scale: 0, rotate: -40 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 12 }}
        className="mx-auto mb-8 w-24"
      >
        <Smiley variant="dead" className="h-auto w-full" />
      </motion.div>
      <SectionHeading
        id="family-title"
        eyebrow="The Mood Family"
        title={
          <JoinSides
            inline
            className="inline-flex flex-wrap justify-center gap-x-[0.28em]"
            left="Too rare to be"
            right={
              <>
                <Highlight>compared</Highlight>.
              </>
            }
          />
        }
        align="center"
      />
      <div className="grid gap-4">
        {manifesto.slice(0, 3).map((line, i) => (
          <WordByWord key={line} text={line} index={i} />
        ))}
      </div>
      <div className="mt-12 flex justify-center gap-3">
        {socials.map((social) => (
          <IconButton
            key={social.href}
            href={social.href}
            external
            label={`${social.label} · ${social.handle}`}
            tone="primary"
            size="lg"
            icon={<InstagramIcon />}
          />
        ))}
      </div>
    </section>
  );
}
