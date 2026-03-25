"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "hero-gradient text-white shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
  secondary:
    "bg-[var(--surface-container-low)] text-[var(--on-surface)] border border-[rgba(255,255,255,0.08)] hover:bg-[var(--surface-container-high)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]",
  ghost:
    "bg-transparent text-[var(--on-surface-variant)] hover:text-white hover:bg-[var(--surface-container-low)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]",
};

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return (
    <motion.button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors",
        variantClasses[variant],
        className,
      )}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    />
  );
}
