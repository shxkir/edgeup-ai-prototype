# Python AI (FastAPI Service)  

This directory contains the Python microservice for the EdgeUp AI prototype. It will handle the AI logic, including:  

- A FastAPI application exposing endpoints for learner profiling, adaptive quizzes, and study plan generation.  
- Integration of a small, domain-specific language model to generate personalized answers and minimize hallucinations.  
- A RAG (Retrieval-Augmented Generation) pipeline to retrieve relevant documents from a ChromaDB-based vector store.  
- Persistent storage of embeddings and documents in a local `chroma_db` directory for reproducible results.  
- Extensible helpers for psychometric profiling, adaptive testing, and schedule optimization.  
- Future integration with LangGraph to orchestrate multi-step agent workflows.
