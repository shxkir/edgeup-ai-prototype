"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import type { EvaluateMcqPayload, EvaluateMcqResponse } from "@/lib/types";
import { cn } from "@/lib/utils";

const topics = [
  "Polity",
  "Economy",
  "Geography",
  "Science & Tech",
  "Environment",
  "History"
];

export function McqPractice() {
  const [topic, setTopic] = useState(topics[0]);
  const [difficulty, setDifficulty] = useState("2");
  const [result, setResult] = useState<EvaluateMcqResponse | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: EvaluateMcqPayload) => api.evaluateMcq(payload),
    onSuccess: (data) => {
      setResult(data);
      setAnswers({});
      setRevealed(false);
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Unable to generate MCQs", description: error.message });
    }
  });

  async function generateQuestions() {
    await mutateAsync({ topic, difficulty: Number(difficulty) });
  }

  function evaluateAnswers() {
    if (!result) return;
    const attempted = Object.keys(answers).length;
    const total = result.questions.length;
    const score = result.questions.reduce((acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc), 0);
    toast({ title: "Attempt evaluated", description: `${score}/${total} correct (${Math.round((score / total) * 100)}%)` });
    setRevealed(true);
  }

  return (
    <Card className="w-full">
      <CardHeader className="gap-2">
        <CardTitle>MCQ Drill</CardTitle>
        <CardDescription>Generate UPSC-aligned prelims questions calibrated to your confidence level.</CardDescription>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="w-full md:w-40">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-36">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Difficulty</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {["1", "2", "3", "4", "5"].map((level) => (
                  <SelectItem key={level} value={level}>
                    Level {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateQuestions} disabled={isPending} className="md:self-end">
            {isPending ? "Generating..." : "Generate Set"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {result ? (
          <div className="space-y-6">
            {result.questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border/70 bg-background/70 p-4 shadow-sm"
              >
                <div className="mb-3 flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="font-medium text-foreground">{question.question}</p>
                </div>
                <RadioGroup
                  value={answers[question.id] ?? ""}
                  onValueChange={(value) => setAnswers((prev) => ({ ...prev, [question.id]: value }))}
                  className="space-y-2"
                >
                  {question.options.map((option) => {
                    const isCorrect = revealed && option === question.correct;
                    const isWrongSelection = revealed && answers[question.id] === option && option !== question.correct;
                    return (
                      <label
                        key={option}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 bg-card/90 p-3 text-sm transition",
                          isCorrect && "border-primary/60 bg-primary/10",
                          isWrongSelection && "border-destructive/60 bg-destructive/10"
                        )}
                      >
                        <RadioGroupItem value={option} />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </RadioGroup>
                {revealed && question.explanation ? (
                  <p className="mt-3 text-xs text-muted-foreground">{question.explanation}</p>
                ) : null}
              </motion.div>
            ))}
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" onClick={evaluateAnswers} variant="secondary">
                Reveal Score
              </Button>
              <Button type="button" variant="outline" onClick={() => setRevealed(true)}>
                Show Solutions
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-8 text-center text-sm text-muted-foreground">
            Generate a question set to begin your practice. Difficulty adjusts the blend of factual recall and analytical reasoning.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
