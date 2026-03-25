"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/subscriptions", label: "Subscriptions" },
  { href: "/admin/scores", label: "Scores" },
  { href: "/admin/draws", label: "Draws" },
  { href: "/admin/charities", label: "Charities" },
  { href: "/admin/winners", label: "Winners" },
  { href: "/admin/analytics", label: "Analytics" },
];

import { motion } from "framer-motion";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="glass p-2 rounded-2xl border border-white/5 shadow-2xl overflow-hidden mb-8">
      <div className="flex flex-wrap gap-1">
        {adminLinks.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-xl px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300",
                active
                  ? "text-white"
                  : "text-[var(--on-surface-variant)] hover:text-white"
              )}
            >
              {active && (
                <motion.div
                  layoutId="admin-nav-pill"
                  className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}