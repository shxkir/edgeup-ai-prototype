"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navItems: Array<{ href: Route; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/ask-upsc", label: "Ask UPSC" },
  { href: "/upload-material", label: "Upload Material" },
  { href: "/practice", label: "Practice" },
  { href: "/current-affairs", label: "Current Affairs" },
  { href: "/dashboard", label: "Dashboard" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent">
      <div className="container mt-6 flex items-center justify-between gap-4 rounded-2xl border border-white/40 bg-white/60 px-4 py-3 shadow-lg backdrop-blur-lg transition hover:border-white/60 dark:border-white/10 dark:bg-background/70">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="EdgeUp AI" width={44} height={44} className="rounded-xl shadow-sm" />
          <div className="flex flex-col">
            <span className="font-serif text-xl font-semibold text-primary">EdgeUp AI</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">UPSC excellence studio</span>
          </div>
        </div>

        <nav className="hidden items-center gap-2 rounded-full border border-border/60 bg-background/60 px-2 py-1.5 shadow-sm md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="text-sm font-medium">
                <span
                  className={cn(
                    "relative inline-flex items-center justify-center rounded-full px-3 py-1 text-muted-foreground transition-colors hover:text-primary",
                    isActive && "bg-primary/10 text-primary shadow-sm"
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    />
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild size="sm" className="bg-primary text-primary-foreground shadow-md shadow-primary/30">
            <Link href="/practice">Start Practice</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Toggle navigation" onClick={() => setOpen((s) => !s)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="container mt-4 flex flex-col rounded-2xl border border-border/60 bg-background/80 p-4 shadow-lg backdrop-blur">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2 text-sm font-medium text-muted-foreground"
                    onClick={() => setOpen(false)}
                  >
                    <span className={cn(isActive && "text-primary")}>{item.label}</span>
                    <Separator className="mt-2" />
                  </Link>
                );
              })}
              <Button asChild className="mt-4" size="lg">
                <Link href="/practice" onClick={() => setOpen(false)}>
                  Start Practice
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
