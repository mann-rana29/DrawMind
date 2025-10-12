from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM  = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60*24


def create_access_token(user_id : int , username : str) -> str:
    expire = datetime.utcnow() + timedelta(minutes= ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {
        "user_id"  : user_id,
        "username" : username,
        "exp" : expire
    }
    return jwt.encode(to_encode, JWT_SECRET_KEY , algorithm= ALGORITHM)

def verify_access_token(token : str) -> Optional[dict]:
    try:
        payload = jwt.decode(token,JWT_SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        username = payload.get("username")

        if user_id is None or username is None:
            return None
        
        return {"user_id" : user_id, "username" : username}
    except JWTError:
        return None
