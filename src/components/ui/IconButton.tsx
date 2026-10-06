import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

type Tone = "default" | "primary" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  /** Accessible name, also shown as the tooltip. */
  label: string;
  icon: ReactNode;
  tone?: Tone;
  size?: Size;
  tooltip?: "top" | "bottom" | "none";
  className?: string;
}

type IconButtonProps = BaseProps &
  (
    | { href: string; external?: boolean; onClick?: never; pressed?: never }
    | { href?: never; external?: never; onClick: () => void; pressed?: boolean }
  );

const tones: Record<Tone, string> = {
  default: "bg-surface text-fg border-line hover:border-mood-purple",
  primary: "bg-smiley text-ink border-ink shadow-[4px_4px_0_var(--color-ink)]",
  ghost: "bg-transparent text-fg-muted border-transparent hover:text-fg hover:bg-mood-purple/15",
};

const sizes: Record<Size, string> = {
  md: "size-11 [&_svg]:size-5",
  lg: "size-14 [&_svg]:size-6",
};

/** Round icon-only button or link with a tooltip that pops on hover and focus. */
export function IconButton(props: IconButtonProps) {
  const { label, icon, tone = "default", size = "md", tooltip = "bottom", className } = props;
  const [showTip, setShowTip] = useState(false);
  const tipId = useId();

  const shared = {
    "aria-label": label,
    "aria-describedby": showTip && tooltip !== "none" ? tipId : undefined,
    className: cn(
      "relative inline-grid place-items-center rounded-full border-2 transition-colors",
      tones[tone],
      sizes[size],
      className,
    ),
    whileHover: { y: -3, scale: 1.04 },
    whileTap: { scale: 0.92 },
    transition: spring,
    onHoverStart: () => {
      setShowTip(true);
    },
    onHoverEnd: () => {
      setShowTip(false);
    },
    onFocus: () => {
      setShowTip(true);
    },
    onBlur: () => {
      setShowTip(false);
    },
  };

  const tip = (
    <AnimatePresence>
      {showTip && tooltip !== "none" && (
        <motion.span
          id={tipId}
          role="tooltip"
          initial={{ opacity: 0, y: tooltip === "top" ? 6 : -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.16 }}
          className={cn(
            "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 rounded-lg bg-fg px-2.5 py-1.5",
            "font-sans text-xs font-semibold whitespace-nowrap text-bg",
            tooltip === "top" ? "bottom-[calc(100%+10px)]" : "top-[calc(100%+10px)]",
          )}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );

  if (props.href !== undefined) {
    return (
      <motion.a
        href={props.href}
        {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...shared}
      >
        {icon}
        {tip}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={props.onClick} aria-pressed={props.pressed} {...shared}>
      {icon}
      {tip}
    </motion.button>
  );
}
