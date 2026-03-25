"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/features/auth/actions";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AppHeader({ 
  isAdmin = false, 
  isPremium = false 
}: { 
  isAdmin?: boolean;
  isPremium?: boolean;
}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    ...(isAdmin ? [{ name: "Admin", href: "/admin" }] : []),
    { name: "Charities", href: "/charities" },
    ...(!isAdmin ? [{ name: "Subscribe", href: "/subscribe" }] : []),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pointer-events-none">
      <div className="glass-nav mx-auto flex w-[min(900px,90%)] items-center justify-between rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto transition-all">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
            ImpactPlay
          </Link>
          <span className="rounded-full bg-[var(--surface-container-high)] border border-[rgba(255,255,255,0.05)] px-3 py-1 font-data text-xs text-[var(--secondary)] tracking-wider">
            {isAdmin ? "ADMIN" : isPremium ? "PREMIUM" : "MEMBER"}
          </span>
        </div>

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
                    layoutId="app-active-pill"
                    className="absolute inset-0 bg-[var(--surface-container-high)] border border-[rgba(255,255,255,0.05)] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
          
          <div className="pl-2 ml-2 border-l border-[var(--outline-variant)] flex items-center">
            <form action={logoutAction}>
              <Button type="submit" variant="ghost" className="text-sm px-4 py-2 h-auto text-[var(--error)] hover:bg-[var(--error)]/10 hover:text-[var(--error)]">
                Logout
              </Button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
}
