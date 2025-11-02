import { Hero } from "@/components/layout/hero";
import { FeatureGrid } from "@/components/layout/features";
import { LearningPathCallout } from "@/components/layout/learning-path";
import { CurrentAffairsFeed } from "@/components/analytics/current-affairs-feed";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-12">
      <Hero />
      <FeatureGrid />
      <LearningPathCallout />
      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm">
          <h2 className="font-serif text-3xl font-semibold text-primary">Why EdgeUp?</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>• Aligns prelims drills with mains answer enrichment in one cohesive routine.</li>
            <li>• Cites exact documents from your knowledge base for verifiable responses.</li>
            <li>• Surfaces weak areas with actionable next steps and progress cues.</li>
          </ul>
        </div>
        <CurrentAffairsFeed />
      </section>
    </div>
  );
}
