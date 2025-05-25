# Makefile for FastAPI + React project

.PHONY: install-backend install-frontend run-backend run-frontend test-backend test-frontend

# Create and activate virtualenv, then install Python deps
install-backend:
	python3 -m venv .venv && source .venv/bin/activate && pip install -r backend/requirements.txt

# Install Node.js dependencies
install-frontend:
	cd frontend && npm install

# Run FastAPI dev server
run-backend:
	source .venv/bin/activate && cd backend && uvicorn app.main:app --reload

# Run React dev server
run-frontend:
	cd frontend && npm run dev

# Run backend tests (uses .venv pytest)
test-backend:
	source .venv/bin/activate && cd backend && pytest

# Run frontend tests (if applicable)
test-frontend:
	cd frontend && npm test
