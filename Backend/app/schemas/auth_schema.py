from pydantic import BaseModel, EmailStr , Field
from typing import Optional
from datetime import datetime

class UserRegister(BaseModel):
    username : str = Field(... , min_length=3 , max_length=50)
    email : EmailStr
    password : str = Field(... , min_length=8 , max_length= 70)

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
