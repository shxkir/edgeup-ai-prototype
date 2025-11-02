import { DashboardOverview } from "@/components/analytics/dashboard-overview";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-2">
        <h1 className="font-serif text-4xl font-semibold text-primary">Learning Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor evolving accuracy, track completed syllabus segments, and review recent practice attempts.
        </p>
      </div>
      <DashboardOverview />
    </div>
  );
}
