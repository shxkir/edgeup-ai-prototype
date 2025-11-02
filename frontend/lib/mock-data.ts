import { CurrentAffairsResponse, DashboardMetric, PracticeAttempt } from "@/lib/types";

export const sampleMetrics: DashboardMetric[] = [
  { id: "accuracy", label: "Answer Accuracy", value: "82%", delta: "+5% vs last week" },
  { id: "mains", label: "Mains Avg Score", value: "68/100", delta: "+3" },
  { id: "mcq", label: "MCQ Strike Rate", value: "74%", delta: "-2%" },
  { id: "study", label: "Study Hours", value: "12h", delta: "+1.5h" }
];

export const recentActivity: PracticeAttempt[] = [
  {
    id: "1",
    topic: "Indian Polity",
    score: 72,
    type: "mcq",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: "2",
    topic: "GS Paper II",
    score: 65,
    type: "mains",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: "3",
    topic: "Economic Development",
    score: 78,
    type: "mcq",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString()
  }
];

export const fallbackAffairs: CurrentAffairsResponse = {
  fetched_at: new Date().toISOString(),
  items: [
    {
      id: "affair-1",
      title: "Union Budget Highlights",
      summary: "Key allocations towards infrastructure, green energy, and social welfare with an emphasis on fiscal consolidation goals.",
      tags: ["Economy", "Budget", "Governance"],
      published_at: new Date().toISOString(),
      source: "PIB"
    },
    {
      id: "affair-2",
      title: "GSAT Launch Strengthens Communication Network",
      summary: "ISRO successfully placed GSAT satellite enhancing secure communication coverage for remote regions and strategic assets.",
      tags: ["Science & Tech", "Space"],
      published_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      source: "The Hindu"
    }
  ]
};
