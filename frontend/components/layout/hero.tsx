"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 shadow-lg md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-6"
      >
        <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
          UPSC Excellence Engine
        </span>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Personalised preparation, curated for every UPSC stage.
        </h1>
        <p className="text-lg text-muted-foreground">
          EdgeUp AI fuses adaptive quizzing, mains answer evaluation, and curated current affairs so you can revise smarter, write sharper, and stay ahead of the competition.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/ask-upsc">Ask UPSC Mentor</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="pointer-events-none absolute -right-10 top-10 hidden h-60 w-60 rounded-full border border-primary/40 bg-primary/10 blur-3xl md:block"
      />
    </section>
  );
}
