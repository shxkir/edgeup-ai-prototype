"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const stats = [
  { label: "Mains Answers Reviewed", value: "18k+" },
  { label: "Adaptive MCQs Served", value: "62k" },
  { label: "Current Affairs Synced", value: "4.6k" }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-gradient-to-br from-background/90 via-background/70 to-primary/10 px-6 py-16 shadow-xl shadow-primary/10 md:px-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_55%)]" />
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 bg-[radial-gradient(circle_at_center,_rgba(38,60,115,0.35),_transparent_65%)] blur-3xl md:block" />
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Premier UPSC Copilot
          </span>
          <div className="space-y-4">
            <h1 className="font-serif text-4xl font-semibold leading-tight text-primary md:text-[3.2rem]">
              Elevate your UPSC strategy with mentor-grade intelligence and handcrafted workflows.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              EdgeUp AI weaves together retrieval-augmented guidance, adaptive testing, and reflective analytics to make every revision session intentional, measurable, and deeply personalised.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="h-12 rounded-full px-8 text-base shadow-lg shadow-primary/30">
              <Link href="/ask-upsc">Launch Edge Mentor</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="h-12 rounded-full border-primary/40 px-8 text-base backdrop-blur">
              <Link href="/dashboard">Preview Dashboard</Link>
            </Button>
            <div className="flex items-center gap-3 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-muted-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Live cohorts syncing daily insights
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md rounded-[2rem] border border-white/30 bg-gradient-to-b from-white/40 to-primary/10 p-6 shadow-2xl backdrop-blur"
        >
          <div className="absolute -left-12 top-12 hidden h-24 w-24 rounded-full border border-primary/40 bg-primary/20 blur-2xl md:block" />
          <div className="absolute -right-10 -top-10 hidden h-28 w-28 rounded-full border border-accent/40 bg-accent/30 blur-2xl md:block" />
          <div className="space-y-6">
            <div className="rounded-2xl border border-primary/30 bg-background/80 p-5 shadow-lg shadow-primary/10">
              <p className="text-sm text-muted-foreground">"Edge Mentor helped me stitch policy, GS answers, and current affairs into one narrative. Every session feels curated for Mains clarity."</p>
              <div className="mt-4 text-xs uppercase tracking-[0.3em] text-primary">AIR 64, CSE 2024</div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/50 bg-background/95 p-5 shadow-lg shadow-accent/20">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="font-serif text-xl text-primary/80 dark:text-accent">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
