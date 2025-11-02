"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, FileText } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import type { UploadMaterialPayload } from "@/lib/types";

const formSchema = z.object({
  doc_id: z.string().min(2, "Provide an identifier"),
  text: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export function UploadMaterialForm() {
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: UploadMaterialPayload) => api.uploadMaterial(payload),
    onSuccess: (data) => {
      toast({ title: "Material added", description: `Indexed ${data.doc_id} successfully.` });
      reset();
      setFile(null);
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Upload failed", description: error.message });
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!file && !values.text) {
      toast({ title: "Add content", description: "Attach a PDF or paste text." });
      return;
    }
    await mutateAsync({ ...values, file: file ?? undefined });
  });

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Upload Reference Material</CardTitle>
        <CardDescription>PDFs, handwritten notes, or plain text will be embedded into your retrieval layer.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="doc_id">Document ID</Label>
            <Input id="doc_id" placeholder="eg. gs2_cooperative_federalism" {...register("doc_id")}
            />
            {errors.doc_id && <p className="text-xs text-destructive">{errors.doc_id.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">PDF Upload</Label>
            <div className="flex items-center gap-3">
              <Input
                id="file"
                type="file"
                accept=".pdf,.txt,.md"
                onChange={(event) => {
                  const uploaded = event.target.files?.[0];
                  if (uploaded) {
                    setFile(uploaded);
                  }
                }}
              />
              {file ? (
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {file.name}
                </span>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Paste Text (optional)</Label>
            <Textarea id="text" rows={8} placeholder="Paste summary notes or curated answers" {...register("text")} />
            {errors.text && <p className="text-xs text-destructive">{errors.text.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-xs text-muted-foreground">Supported formats: PDF, TXT, Markdown. Files are split, embedded, and persisted via ChromaDB.</p>
          <Button type="submit" disabled={isPending} className="min-w-[160px]">
            <CloudUpload className="mr-2 h-4 w-4" />
            {isPending ? "Uploading..." : "Upload"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
