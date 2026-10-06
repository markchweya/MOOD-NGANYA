import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IconButton } from "@/components/ui/IconButton";
import { useTheme } from "@/features/theme/useTheme";

/** Sun/moon button: the icon spins over and the new theme spreads out from it. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <IconButton
      label={`Switch to ${next} mode`}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      icon={
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid place-items-center"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </motion.span>
        </AnimatePresence>
      }
    />
  );
}
