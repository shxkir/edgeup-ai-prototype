#!/bin/bash
# Startup script for EdgeUp AI prototype services

# Set default port for Python service if not provided
PYTHON_SERVICE_PORT=${PYTHON_SERVICE_PORT:-8000}

# Start the Python FastAPI service in the background
echo "Starting Python AI service on port $PYTHON_SERVICE_PORT..."
uvicorn python_ai.app:app --host 0.0.0.0 --port $PYTHON_SERVICE_PORT &

# Export environment variable so the Rust gateway knows where to forward requests
export PYTHON_SERVICE_URL=http://localhost:$PYTHON_SERVICE_PORT

# Start the Rust Actix-Web gateway
echo "Starting Rust gateway..."
cd rust_api
cargo run
