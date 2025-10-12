from fastapi import APIRouter , HTTPException , Depends , status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import User
from app.schemas.auth_schema import UserLogin, UserOut, UserRegister, Token
from app.auth.password import verify_pass , hash_pass
from app.auth.dependencies import get_current_user
from app.auth.auth import create_access_token

router = APIRouter()

@router.post("/register" , response_model= UserOut)
async def register(user_data : UserRegister , db : AsyncSession = Depends(get_db)):
    try:
        existing_user = await db.execute(
        select(User).filter(User.username == user_data.username)
        )
        if existing_user.scalar_one_or_none():
            raise HTTPException(
                status_code= status.HTTP_400_BAD_REQUEST,
                detail = "Username already registered"
            )

        hashed_password = hash_pass(user_data.password)

        new_user = User(
            username = user_data.username,
            email = user_data.email,
            password_hash = hashed_password
        )

        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        return new_user
    except ValueError as e:
        if "password cannot be longer than 72 bytes" in str(e):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password is too long. Maximum length is 70 characters."
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during registration"
        )

@router.post("/login", response_model=Token)
async def login(user_data : UserLogin , db : AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).filter(User.username == user_data.username)
    )
    user = result.scalar_one_or_none()

    if not user or not verify_pass(user_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token = create_access_token(user.id , user.username)
    return {"access_token" : access_token , "token_type" : "bearer"}

@router.get("/me", response_model=UserOut)
async def get_current_user_info(current_user : User = Depends(get_current_user)):
    return current_user
