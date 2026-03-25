"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Charities", href: "/charities" },
    { name: "Donate", href: "/donate" },
    { name: "Login", href: "/login" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pointer-events-none">
      <div className="glass-nav mx-auto flex w-[min(900px,90%)] items-center justify-between rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto transition-all">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)]" />
          ImpactPlay
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-[var(--on-surface-variant)] hover:text-white transition-colors rounded-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="public-active-pill"
                    className="absolute inset-0 bg-[var(--surface-container-high)] border border-[rgba(255,255,255,0.05)] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
          <div className="pl-2 ml-2 border-l border-[var(--outline-variant)]">
            <Link href="/signup">
              <Button variant="primary" className="py-2.5 px-6 rounded-full text-sm h-auto shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                Start Playing
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
