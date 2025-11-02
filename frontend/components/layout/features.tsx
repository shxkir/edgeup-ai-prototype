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
      {features.map((feature, index) => (
        <article
          key={feature.title}
          className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-card/90 via-card/60 to-primary/5 p-7 shadow-xl shadow-primary/10 transition duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-primary/20"
        >
          <div className="absolute -top-10 right-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="font-serif text-4xl text-primary/60">0{index + 1}</span>
          </div>
          <h3 className="mt-6 font-serif text-2xl font-semibold text-primary">{feature.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-primary/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            signature capability
          </div>
        </article>
      ))}
    </section>
  );
}
