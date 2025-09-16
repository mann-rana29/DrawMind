from pydantic import BaseModel
from datetime import datetime

class DiagramBase(BaseModel):
    title: str
    plantuml_code: str
    

class DiagramCreate(DiagramBase):
    pass

class DiagramOut(DiagramBase):
    id: int 
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True