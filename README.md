# edgeup-ai-prototype

Prototype AI agent for EdgeUp  project, built by Ismaiel.

## Overview

This repository contains a prototype AI backend for EdgeUp, an AI powered study companion that personalizes exam preparation by profiling learners and adapting content. The goal of this project is to scaffold a microservice architecture that can be extended.

## Objectives

- Implement a high‭performance Rust gateway using Actix‑Web to handle HTTP requests, enforce API keys and forward calls to the AI service.  
- Build a Python FastAPI service that hosts the AI logic, including:  
  - Psychometric profiling to assess a learner’s personality, aptitude, skills and character.  
  - An adaptive quiz engine that adjusts question difficulty based on real‑time performance.  
  - Study plan generation that produces personalized schedules based on strengths and weaknesses.  
  - Integration of a custom small language model (e.g., a fine‑tuned MiniLM) for domain‑specific answer generation.  
- Provide clean REST endpoints (`/api/profile`, `/api/quiz`, `/api/study-plan`) with JSON responses.  
- Persist embeddings and documents using a vector store such as ChromaDB for retrieval‭augmented generation (RAG) pipelines.  
- Lay the groundwork for future expansion into additional exam domains and interactive agent orchestration (e.g., LangGraph workflows).

## Directory Structure

- `rust_api/` – Actix‑Web gateway that acts as the entry point for all API calls. It validates an `X‑API‑KEY` header, logs requests and responses, retries on failures and forwards calls to the Python AI service.  
- `python_ai/` – FastAPI service containing the AI logic, including endpoints for profiling, quizzes and study plans. This is where the RAG helper functions, language model integration and adaptive algorithms live.  
- `docs/` – Documentation and reference materials.  
- `scripts/` – Helper scripts to bootstrap, run and manage the services.

## Getting Started

This repository currently contains only the initial README and folder structure. The next steps will be to scaffold out the Rust gateway and Python service, then iteratively implement the AI functionality described above.

## Running the Prototype Locally  
To run the EdgeUp AI prototype locally and access the API endpoints, follow these steps:  
1. **Set up and start the Python FastAPI service**:  
   ```bash  
   cd python_ai  
   python3 -m venv .venv  
   source .venv/bin/activate  
   pip install -r requirements.txt  
   uvicorn app:app --host 0.0.0.0 --port 8000 &  
   ```  
2. **Start the Rust gateway service** in another terminal:  
   ```bash  
   cd rust_api  
   export PYTHON_SERVICE_URL="http://127.0.0.1:8000"  
   export HOST="0.0.0.0"  
   export PORT="8080"  
   export X_API_KEY="demo-key"  # choose any string  
   cargo run  
   ```  
3. **Access the API via the gateway**: once both services are running, send requests to `http://localhost:8080`. For example, you can check the health endpoint and call the profile API:  
   ```bash  
   curl http://localhost:8080/health  
   curl -X POST -H "Content-Type: application/json" -H "X-API-KEY: demo-key" \  
     -d '{"name": "Ismaiel"}' http://localhost:8080/api/profile  
   ```  
These steps will start the Python AI service and the Rust gateway, allowing you to access the EdgeUp API locally.
