"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { fallbackAffairs } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function CurrentAffairsFeed() {
  const {
    data,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["current-affairs"],
    queryFn: async () => {
      try {
        return await api.pullCurrentAffairs();
      } catch (error) {
        if (error instanceof Error) {
          toast({ variant: "destructive", title: "Could not fetch feed", description: error.message });
        }
        return fallbackAffairs;
      }
    },
    staleTime: 1000 * 60 * 30,
    initialData: fallbackAffairs
  });

  const items = useMemo(() => data.items ?? [], [data]);

  return (
    <Card className="h-full">
      <CardHeader className="flex items-start justify-between gap-4 md:flex-row">
        <div>
          <CardTitle>Current Affairs Digest</CardTitle>
          <CardDescription>Curated PIB, editorial, and report summaries tailored to GS relevance.</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" style={{ animationPlayState: isFetching ? "running" : "paused" }} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="h-[480px]">
        <ScrollArea className="h-full">
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold text-primary">{item.title}</h3>
                  <span className="text-xs text-muted-foreground">{formatDate(item.published_at)}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={`${item.id}-${tag}`} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {item.source ? <p className="mt-2 text-xs text-muted-foreground">Source: {item.source}</p> : null}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
