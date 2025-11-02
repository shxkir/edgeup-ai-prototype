"use client";

import { useMutation } from "@tanstack/react-query";
import { SendHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import type { AskPayload, ChatMessage } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";

const starterPrompts = [
  "Analyse the significance of cooperative federalism in recent policy reforms.",
  "Draft a 250-word answer on India's semiconductor mission.",
  "Summarise today's PIB releases relevant for GS Paper II.",
  "Give me high-yield MCQs on climate governance."
];

type AskFormData = AskPayload;

export function AskUpscChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content: "Hello! I am your Edge Mentor. Ask me anything about UPSC prep—I'll reference your material wherever possible.",
      createdAt: new Date().toISOString()
    }
  ]);

  const { register, handleSubmit, reset, setValue } = useForm<AskFormData>({
    defaultValues: {
      question: ""
    }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.ask,
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Unable to fetch answer",
        description: error.message || "Please try again shortly."
      });
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!values.question.trim()) {
      toast({ title: "Ask a question", description: "Type a UPSC query to continue." });
      return;
    }
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: values.question,
      createdAt: new Date().toISOString()
    };
    setMessages((prev) => [...prev, userMessage]);
    reset();

    try {
      const response = await mutateAsync(values);
      const answerText = response.answer
        ? `${response.answer}`
        : response.results.length
          ? `Here are the closest references I found:\n\n${response.results
              .map((hit, index) => `${index + 1}. ${hit.text}\n(Source: ${hit.id})`)
              .join("\n\n")}`
          : "I could not retrieve a precise answer. Try uploading additional notes or rephrasing the query.";

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: answerText,
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="flex h-[70vh] flex-col rounded-2xl border border-border/70 bg-card shadow-sm">
        <header className="flex items-center justify-between border-b border-border/60 px-5 py-3">
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">Ask Edge Mentor</h2>
            <p className="text-xs text-muted-foreground">Conversational UPSC guidance grounded in your knowledge base.</p>
          </div>
          <Badge variant="gold" className="text-xs uppercase tracking-wide">RAG-Powered</Badge>
        </header>
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex flex-col gap-1 rounded-xl border border-border/40 bg-background/80 p-4", message.role === "assistant" ? "ml-0" : "ml-auto max-w-xl bg-primary/10")}
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{message.role === "assistant" ? "Edge Mentor" : "You"}</span>
                  <span>{formatDate(message.createdAt)}</span>
                </div>
                <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-foreground">{message.content}</pre>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={onSubmit} className="space-y-3 border-t border-border/60 px-6 py-4">
          <Textarea
            placeholder="Ask about governance, GS prep, or current affairs..."
            {...register("question")}
            disabled={isPending}
            className="font-serif"
            rows={3}
          />
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setValue("question", prompt, { shouldDirty: true })}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {prompt.slice(0, 30)}...
                </Button>
              ))}
            </div>
            <Button type="submit" disabled={isPending} className="min-w-[120px]">
              {isPending ? "Thinking..." : (
                <span className="flex items-center gap-2">
                  Send
                  <SendHorizontal className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>

      <aside className="space-y-4 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm">
        <h3 className="font-serif text-lg font-semibold text-primary">Get richer responses</h3>
        <p className="text-sm text-muted-foreground">
          Upload curated notes and previous year answers to ground the retrieval engine. The more context you provide, the sharper the answer alignment.
        </p>
        <div className="rounded-xl border border-dashed border-primary/50 bg-primary/5 p-4 text-sm text-primary">
          Edge Mentor cites document IDs so you can trace the exact source in your repository.
        </div>
      </aside>
    </div>
  );
}
