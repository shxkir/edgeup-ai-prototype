import axios from "axios";
import {
  AskPayload,
  AskResponse,
  CurrentAffairsResponse,
  EvaluateMainsPayload,
  EvaluateMainsResponse,
  EvaluateMcqPayload,
  EvaluateMcqResponse,
  UploadMaterialPayload,
  UploadMaterialResponse
} from "@/lib/types";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.detail || error.response.statusText;
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);

export const api = {
  ask(payload: AskPayload) {
    return client.post<AskResponse>("/api/ask", payload).then((res) => res.data);
  },
  async uploadMaterial(payload: UploadMaterialPayload) {
    const formData = new FormData();
    formData.append("doc_id", payload.doc_id);
    if (payload.file) {
      formData.append("file", payload.file);
    }
    if (payload.text) {
      formData.append("text", payload.text);
    }
    const response = await client.post<UploadMaterialResponse>("/api/add_doc", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  },
  evaluateMains(payload: EvaluateMainsPayload) {
    return client.post<EvaluateMainsResponse>("/evaluate_mains", payload).then((res) => res.data);
  },
  evaluateMcq(payload: EvaluateMcqPayload) {
    return client.post<EvaluateMcqResponse>("/evaluate_mcq", payload).then((res) => res.data);
  },
  pullCurrentAffairs() {
    return client.post<CurrentAffairsResponse>("/current_affairs_pull").then((res) => res.data);
  }
};
