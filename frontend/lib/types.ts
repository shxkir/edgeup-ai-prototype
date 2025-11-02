export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}

export interface AskPayload {
  question: string;
}

export interface AskResponse {
  question: string;
  results: Array<{
    id: string;
    text: string;
    distance: number;
  }>;
  answer?: string;
}

export interface UploadMaterialPayload {
  doc_id: string;
  text?: string;
  file?: File;
}

export interface UploadMaterialResponse {
  status: string;
  doc_id: string;
}

export interface EvaluateMainsPayload {
  prompt: string;
  answer: string;
}

export interface EvaluateMainsResponse {
  score: number;
  feedback: string;
  outline?: string[];
}

export interface EvaluateMcqPayload {
  topic: string;
  difficulty: number;
}

export interface EvaluateMcqResponse {
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correct?: string;
    explanation?: string;
  }>;
}

export interface CurrentAffairsItem {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  published_at: string;
  source?: string;
}

export interface CurrentAffairsResponse {
  items: CurrentAffairsItem[];
  fetched_at: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  delta?: string;
}

export interface PracticeAttempt {
  id: string;
  topic: string;
  score: number;
  createdAt: string;
  type: "mcq" | "mains";
}
