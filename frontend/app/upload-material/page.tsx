import { UploadMaterialForm } from "@/components/forms/upload-material-form";

export default function UploadMaterialPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-2">
        <h1 className="font-serif text-4xl font-semibold text-primary">Upload Study Material</h1>
        <p className="text-muted-foreground">
          Add curated notes, policy briefs, or NCERT summaries. These power the retrieval layer for precision answers.
        </p>
      </div>
      <UploadMaterialForm />
    </div>
  );
}
