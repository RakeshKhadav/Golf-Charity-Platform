"use client";

import { cn } from "@/lib/utils/cn";
import { motion, type HTMLMotionProps } from "framer-motion";

type CardProps = HTMLMotionProps<"div"> & {
  variant?: "primary" | "glass" | "data";
  disableHover?: boolean;
};

const variantClasses = {
  primary: "bg-[var(--surface-container-high)] border border-[rgba(255,255,255,0.05)] ambient-shadow-strong",
  glass: "glass-card",
  data: "bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)]",
};

export function Card({ className, variant = "primary", disableHover = false, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-3xl p-6 text-[var(--on-surface)] block relative overflow-hidden transition-all duration-500",
        variantClasses[variant],
        !disableHover && "hover:-translate-y-1 hover:shadow-2xl hover:border-[rgba(255,255,255,0.1)]",
        variant === "primary" && "before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-[var(--primary)]/30 before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}
