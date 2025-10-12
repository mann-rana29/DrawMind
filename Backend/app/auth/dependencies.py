from fastapi import Depends, HTTPException , status
from fastapi.security import HTTPBearer , HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models import User
from app.auth.auth import verify_token

security = HTTPBearer()

async def get_current_user(credentials : HTTPAuthorizationCredentials = Depends(security) , db: AsyncSession = Depends(get_db)) -> User:
    token = credentials.credentials

    token_data = verify_token(token)
    if not token_data:
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials" , headers= {"WWW-Authenticate" : "Bearer"})
    
    result = await db.execute(
        select(User).filter(User.id == token_data["user_id"])
    )
    user = result.scalar_one_or_none()

    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    return user
    
