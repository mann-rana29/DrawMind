from pydantic import BaseModel, EmailStr
from typing import Optional

class AuthBase(BaseModel):
    username: str

class AuthLogin(AuthBase):
    password: str

class AuthRegistration(AuthBase):
    password: str
    email: EmailStr
    confirm_password: str

class AuthToken():
    access_token: str
    token_type: str
    expires_in: Optional[int] = 0