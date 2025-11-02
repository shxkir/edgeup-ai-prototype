import { CurrentAffairsFeed } from "@/components/analytics/current-affairs-feed";

export default function CurrentAffairsPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-2">
        <h1 className="font-serif text-4xl font-semibold text-primary">Current Affairs Digest</h1>
        <p className="text-muted-foreground">
          Access AI-structured briefs from PIB, Yojana, and flagship newspapers tailored for daily revision.
        </p>
      </div>
      <CurrentAffairsFeed />
    </div>
  );
}
