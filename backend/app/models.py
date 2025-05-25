from sqlalchemy import Column, Integer, String
from .database import Base
from pydantic import BaseModel, ConfigDict

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)

class NoteBase(BaseModel):
    title: str
    content: str

    model_config = ConfigDict(from_attributes=True)