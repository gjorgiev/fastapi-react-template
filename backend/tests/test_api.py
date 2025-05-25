import os
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from app.main import app

# Set up a test DB file
TEST_DB_PATH = "test_notes.db"
SQLALCHEMY_TEST_DB_URL = f"sqlite:///{TEST_DB_PATH}"

# Remove the test DB file if it exists to ensure a clean state
if os.path.exists(TEST_DB_PATH):
    os.remove(TEST_DB_PATH)

engine = create_engine(SQLALCHEMY_TEST_DB_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_ping():
    response = client.get("/ping")
    assert response.status_code == 200
    assert response.json() == {"message": "pong"}

def test_create_note():
    payload = {"title": "Test Note", "content": "This is a test."}
    response = client.post("/notes", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == payload["title"]
    assert data["content"] == payload["content"]

def test_get_notes():
    client.post("/notes", json={"title": "Another", "content": "Hello"})
    response = client.get("/notes")
    assert response.status_code == 200
    notes = response.json()
    assert isinstance(notes, list)
    assert len(notes) >= 1
