"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import type { EvaluateMainsPayload, EvaluateMainsResponse } from "@/lib/types";

const defaultPrompt = "Discuss the role of local self governments in achieving inclusive growth (250 words).";

type FormValues = EvaluateMainsPayload;

export function MainsPractice() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      prompt: defaultPrompt,
      answer: ""
    }
  });

  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: (payload: EvaluateMainsPayload) => api.evaluateMains(payload),
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Evaluation failed", description: error.message });
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!values.answer.trim()) {
      toast({ title: "Write your answer", description: "Provide a response for evaluation." });
      return;
    }
    await mutateAsync(values);
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mains Answer Lab</CardTitle>
        <CardDescription>Draft structured answers with notebook-style formatting and get instant scorecards.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Question Prompt</Label>
              <Textarea id="prompt" rows={4} className="font-serif" {...register("prompt")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Your Answer</Label>
              <Textarea
                id="answer"
                rows={16}
                className="font-serif"
                placeholder="Structure your answer with introduction, body, conclusion..."
                {...register("answer")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-dashed border-primary/50 bg-primary/5 p-4 text-sm text-muted-foreground">
              Tip: Maintain headings, underline keywords, and reference committee reports. EdgeUp AI evaluates coherence and enrichment.
            </div>
            {data ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 rounded-2xl border border-border/70 bg-background/90 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-primary">Score: {data.score}/100</h3>
                    <p className="text-xs text-muted-foreground">Generated evaluation blueprint</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <h4 className="font-semibold">Feedback</h4>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} className="markdown">
                    {data.feedback}
                  </ReactMarkdown>
                </div>
                {data.outline?.length ? (
                  <div className="space-y-2 text-sm">
                    <h4 className="font-semibold">Suggested Enrichments</h4>
                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                      {data.outline.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </motion.div>
            ) : (
              <div className="flex-1 rounded-2xl border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground">
                Submit an answer to view AI-assisted evaluation, including scoring guides and enrichment suggestions.
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button type="button" variant="ghost" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isPending || isSubmitting}>
            {isPending || isSubmitting ? "Evaluating..." : "Evaluate Answer"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
