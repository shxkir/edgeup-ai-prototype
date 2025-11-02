import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const steps = [
  {
    title: "Daily Warm-up",
    description: "Attempt 15 curated MCQs based on yesterday's current affairs and weak topics.",
    progress: 68
  },
  {
    title: "Mains Drill",
    description: "Write one GS answer with references pulled from your personal knowledge base.",
    progress: 45
  },
  {
    title: "Revision Sync",
    description: "Upload new notes or mark completed syllabus segments to keep the dashboard current.",
    progress: 80
  }
];

export function LearningPathCallout() {
  return (
    <section className="grid gap-6 rounded-3xl border border-primary/40 bg-primary/5 p-6 md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        <h2 className="font-serif text-3xl font-semibold text-primary">Your integrated UPSC routine</h2>
        <p className="text-sm text-muted-foreground">
          Align prelims drills, mains writing, and current affairs consolidation in a single workspace. EdgeUp AI adapts as you log attempts and upload resources.
        </p>
        <Button asChild className="bg-primary text-primary-foreground">
          <Link href="/dashboard">
            Explore Dashboard Insights
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="space-y-4 rounded-2xl border border-border/70 bg-background/80 p-4 shadow-inner">
        {steps.map((step) => (
          <div key={step.title} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">{step.title}</h3>
              <span className="text-xs text-muted-foreground">{step.progress}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{step.description}</p>
            <Progress value={step.progress} />
          </div>
        ))}
      </div>
    </section>
  );
}
