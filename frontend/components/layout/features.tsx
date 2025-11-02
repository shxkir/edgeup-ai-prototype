import { Lightbulb, NotebookPen, Target, UploadCloud } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Ask Edge Mentor",
    description: "Pose UPSC-level questions and receive referenced answers grounded in your uploaded notes."
  },
  {
    icon: NotebookPen,
    title: "Master Mains",
    description: "Draft and refine GS answers in a distraction-free editor with AI scoring guidance."
  },
  {
    icon: Target,
    title: "Adaptive Practice",
    description: "Sharpen weak areas with calibrated MCQ sets that adjust to your performance."
  },
  {
    icon: UploadCloud,
    title: "Ingest Your Material",
    description: "Upload NCERT summaries, coaching PDFs, or notes to enrich the retrieval layer."
  }
];

export function FeatureGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <article key={feature.title} className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
          <feature.icon className="mb-4 h-10 w-10 text-primary" />
          <h3 className="font-serif text-xl font-semibold text-primary">{feature.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
        </article>
      ))}
    </section>
  );
}
