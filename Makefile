# Makefile for FastAPI + React project

.PHONY: install-backend install-web run-backend run-web test-backend test-web

# Create and activate virtualenv, then install Python deps
install-backend:
	python3 -m venv .venv && source .venv/bin/activate && pip install -r backend/requirements.txt

# Install Node.js dependencies
install-web:
	cd web && npm install

# Run FastAPI dev server
run-backend:
	source .venv/bin/activate && cd backend && uvicorn app.main:app --reload --host 0.0.0.0

# Run React dev server
run-web:
	cd web && npm run dev

# Run backend tests (uses .venv pytest)
test-backend:
	source .venv/bin/activate && cd backend && pytest

# Run web tests (if applicable)
test-web:
	cd web && npm test
