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
    <header className="sticky top-0 z-40 w-full border-b border-border/60 backdrop-blur bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="EdgeUp AI" width={36} height={36} className="rounded-lg" />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold text-primary">EdgeUp AI</span>
            <span className="text-xs text-muted-foreground">UPSC mastery, accelerated</span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="text-sm font-medium">
                <span
                  className={cn(
                    "relative pb-1 text-muted-foreground transition-colors hover:text-primary",
                    isActive && "text-primary"
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    />
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild size="sm" className="bg-primary text-primary-foreground">
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
            className="overflow-hidden border-t border-border/60 md:hidden"
          >
            <div className="container flex flex-col py-4">
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
              <Button asChild className="mt-4">
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
