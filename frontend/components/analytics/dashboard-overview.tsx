import { ArrowUpRight, FileBarChart2, History, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sampleMetrics, recentActivity } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function DashboardOverview() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2">
          {sampleMetrics.map((metric) => (
            <Card key={metric.id} className="border-border/70 bg-card">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {metric.label}
                </CardDescription>
                <CardTitle className="text-3xl text-primary">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">{metric.delta}</p>
              </CardContent>
            </Card>
          ))}
        </section>
        <Card className="border-border/70 bg-card">
          <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Mains Mastery Tracker</CardTitle>
              <CardDescription>Consistency indicator across GS papers and essay prep.</CardDescription>
            </div>
            <Badge variant="gold" className="gap-1 text-xs">
              <ArrowUpRight className="h-3 w-3" /> Momentum
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-border/60 bg-background/70 p-4 shadow-inner">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">GS II - Governance</p>
              <Progress value={72} />
              <p className="text-sm text-muted-foreground">Answer quality improved after incorporating ARC reports.</p>
            </div>
            <div className="space-y-3 rounded-2xl border border-border/60 bg-background/70 p-4 shadow-inner">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">GS III - Economy</p>
              <Progress value={65} />
              <p className="text-sm text-muted-foreground">Focus on linking budget data with structural reforms.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="flex h-full flex-col border-border/70 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-primary" /> Recent Activity
          </CardTitle>
          <CardDescription>Latest attempts across MCQ drills and mains answers.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ScrollArea className="h-[360px] pr-2">
            <ul className="space-y-3">
              {recentActivity.map((attempt) => (
                <li key={attempt.id} className="rounded-2xl border border-border/60 bg-background/70 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{attempt.topic}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(attempt.createdAt)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="uppercase tracking-wide">{attempt.type.toUpperCase()}</span>
                    <span>Score: {attempt.score}</span>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
