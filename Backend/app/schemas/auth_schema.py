from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserRegister(BaseModel):
    username : str
    email : EmailStr
    password : str

class UserLogin(BaseModel):
    username : str
    password : str

class Token(BaseModel):
    access_token : str
    token_type : str = "bearer"

class UserOut(BaseModel):
    id : int
    username : str
    email : EmailStr
    is_active  : bool
    created_at : datetime

    class Config:
        from_attributes = True
        