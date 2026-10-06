import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IconButton } from "@/components/ui/IconButton";
import { useTheme } from "@/features/theme/useTheme";

/** Sun/moon button; the icon spins out and the next one spins in. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <IconButton
      label={`Switch to ${next} mode`}
      onClick={toggleTheme}
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
