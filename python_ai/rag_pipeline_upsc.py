"""
Retrieval-augmented generation for UPSC material.
Use Chroma/Milvus to persist embeddings and generate structured answers.
"""

import os
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from typing import Optional

CHROMA_DIR = os.getenv("CHROMA_DIR", "python_ai/chroma_db_upsc")
chroma_client = chromadb.Client(Settings(chroma_db_impl="duckdb+parquet", persist_directory=CHROMA_DIR))
collection = chroma_client.get_or_create_collection("upsc_docs")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

async def embed_material(doc_id: str, text: str) -> None:
    embedding = model.encode([text])[0].tolist()
    collection.add(documents=[text], ids=[doc_id], embeddings=[embedding])
    chroma_client.persist()

async def query_question(question: str, topic: Optional[str] = None, hindi: bool = False) -> dict:
    query_emb = model.encode([question])[0].tolist()
    results = collection.query(query_embeddings=[query_emb], n_results=5, include=["documents", "ids", "distances"])
    if not results["documents"]:
        return {"confidence": 0.0, "message": "No relevant material found."}
    return {
        "confidence": 0.5,
        "intro": "Insert relevant fact or constitutional article.",
        "body": [
            {"heading": "Key Points", "content": "Summarise key issues."},
            {"heading": "Case Studies", "content": "ARC/NITI Aayog examples."},
        ],
        "conclusion": "Balanced conclusion aligned with constitutional values.",
        "citations": results["ids"][0],
    }
