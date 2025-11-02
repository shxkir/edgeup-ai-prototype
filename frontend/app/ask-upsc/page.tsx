import { AskUpscChat } from "@/components/chat/ask-upsc-chat";

export default function AskUpscPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-2">
        <h1 className="font-serif text-4xl font-semibold text-primary">Ask UPSC Mentor</h1>
        <p className="text-muted-foreground">
          Engage with an AI mentor trained for UPSC discourse. Each response links back to documents you have curated.
        </p>
      </div>
      <AskUpscChat />
    </div>
  );
}
