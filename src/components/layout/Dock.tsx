import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { sectionLinks } from "@/app/sections";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

const ids = sectionLinks.map((link) => link.id);

/** Floating icon dock; the purple pill slides to the section on screen. */
export function Dock() {
  const active = useActiveSection(ids);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.nav
      aria-label="Sections"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...spring, delay: 0.8 }}
      className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
    >
      <ul className="flex items-center gap-1 rounded-full border border-line bg-bg/75 p-1.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)] backdrop-blur-xl">
        {sectionLinks.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => {
                  setHovered(id);
                }}
                onMouseLeave={() => {
                  setHovered(null);
                }}
                onFocus={() => {
                  setHovered(id);
                }}
                onBlur={() => {
                  setHovered(null);
                }}
                className={cn(
                  "relative grid size-11 place-items-center rounded-full transition-colors duration-300",
                  isActive ? "text-atmos-white" : "text-fg-muted hover:text-fg",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-active"
                    transition={spring}
                    className="absolute inset-0 rounded-full bg-mood-purple shadow-[0_0_24px_-4px_var(--color-mood-purple)]"
                  />
                )}
                <Icon className="relative size-5" strokeWidth={2} />
              </a>
              <AnimatePresence>
                {hovered === id && (
                  <motion.span
                    role="tooltip"
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 rounded-lg bg-fg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-bg"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
