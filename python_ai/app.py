from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings

app = FastAPI()

# Setup ChromaDB collection
CHROMA_DIR = "python_ai/chroma_db"
chroma_client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory=CHROMA_DIR
))
collection = chroma_client.get_or_create_collection("docs")

# Load embedding model
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

class ProfileRequest(BaseModel):
    answers: List[int]

class QuizRequest(BaseModel):
    topic: str
    difficulty: int = 1

class PlanRequest(BaseModel):
    strengths: List[str]
    weaknesses: List[str]

class AddDocRequest(BaseModel):
    doc_id: str
    text: str

class AskRequest(BaseModel):
    question: str

@app.get("/")
async def root():
    return {"message": "EdgeUp AI service"}

@app.post("/profile")
async def profile(req: ProfileRequest):
    avg = sum(req.answers) / len(req.answers)
    if avg > 4:
        profile = "analytical"
    elif avg < 2:
        profile = "creative"
    else:
        profile = "balanced"
    return {"profile": profile}

@app.post("/quiz")
async def quiz(req: QuizRequest):
    num_questions = min(max(req.difficulty, 1), 5)
    questions = [f"{req.topic} question {i}" for i in range(1, num_questions + 1)]
    return {"topic": req.topic, "difficulty": req.difficulty, "questions": questions}

@app.post("/study-plan")
async def study_plan(req: PlanRequest):
    plan = {}
    plan["day1"] = req.weaknesses
    plan["day2"] = req.strengths
    return {"plan": plan}

@app.post("/add_doc")
async def add_doc(req: AddDocRequest):
    embedding = model.encode([req.text])[0].tolist()
    collection.add(documents=[req.text], ids=[req.doc_id], embeddings=[embedding])
    chroma_client.persist()
    return {"status": "added", "doc_id": req.doc_id}

@app.post("/ask")
async def ask(req: AskRequest):
    query_embedding = model.encode([req.question])[0].tolist()
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3,
        include=["documents", "ids", "distances"]
    )
    hits = []
    for doc, doc_id, distance in zip(results["documents"][0], results["ids"][0], results["distances"][0]):
        hits.append({"id": doc_id, "text": doc, "distance": distance})
    return {"question": req.question, "results": hits}
