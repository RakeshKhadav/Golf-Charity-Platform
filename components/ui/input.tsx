import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  mono?: boolean;
  inputSize?: "default" | "huge";
};

export function Input({ className, mono = false, inputSize = "default", ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full bg-[var(--surface-container-lowest)] text-[var(--on-surface)] outline-none transition-all",
        "border border-[var(--outline-variant)] focus:border-transparent focus:ring-2 focus:ring-[var(--primary)] focus:shadow-[0_0_20px_rgba(37,99,235,0.25)]",
        inputSize === "default" && "rounded-2xl px-4 py-3 text-sm",
        inputSize === "huge" && "rounded-[2rem] px-8 py-6 text-5xl font-bold text-center tracking-tight",
        mono && "font-data",
        className,
      )}
      {...props}
    />
  );
}
