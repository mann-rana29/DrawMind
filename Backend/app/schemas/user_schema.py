
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional
from app.schemas.diagram_schema import DiagramBase

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    created_at: datetime
    diagrams_owned: Optional[List[DiagramBase]] = []
    is_active: bool = True

    class Config:
        orm_mode = True

