import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { McqPractice } from "@/components/practice/mcq-practice";
import { MainsPractice } from "@/components/practice/mains-practice";

export default function PracticePage() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-2">
        <h1 className="font-serif text-4xl font-semibold text-primary">Practice Studio</h1>
        <p className="text-muted-foreground">
          Alternate between prelims-style MCQs and mains answer writing. Track progression instantly with AI-backed evaluation.
        </p>
      </div>
      <Tabs defaultValue="mcq" className="space-y-6">
        <TabsList>
          <TabsTrigger value="mcq">MCQ Drills</TabsTrigger>
          <TabsTrigger value="mains">Mains Lab</TabsTrigger>
        </TabsList>
        <TabsContent value="mcq">
          <McqPractice />
        </TabsContent>
        <TabsContent value="mains">
          <MainsPractice />
        </TabsContent>
      </Tabs>
    </div>
  );
}
