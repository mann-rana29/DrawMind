"""
Database configuration and session management for DrawMind.

This module sets up:
- SQLAlchemy engine with async support
- Database session management
- Base model class for all database models
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Create async engine for database operations
engine = create_async_engine(
    DATABASE_URL,
    echo=True,  # Set to False in production
    future=True,
    connect_args={
        "ssl": "require",
        "server_settings": {
            "application_name": "DrawMind",
        }
    }
)

# Create async session factory
AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base class for all database models
Base = declarative_base()


async def get_db():
    """
    Dependency function to get database session.
    This will be used in FastAPI route dependencies.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def create_tables():
    """
    Create all database tables.
    Call this on application startup.
    """
    # Import models so SQLAlchemy knows about them
    from app.models import User, Diagram, ChatHistory
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def create_default_user():

    from app.models import User
    from sqlalchemy import select
    
    async with AsyncSessionLocal() as session:
        try:
            # Check if default user already exists
            result = await session.execute(
                select(User).filter(User.username == "testuser")
            )
            existing_user = result.scalar_one_or_none()
            
            if not existing_user:
                # Create default user
                default_user = User(
                    username="testuser",
                    email="test@drawmind.com",
                    password_hash="temporary_hash_for_testing",  # Will be proper hash later with auth
                    is_active=True
                )
                session.add(default_user)
                await session.commit()
                print("Created default test user (ID: 1)")
            else:
                print("Default test user already exists")
                
        except Exception as e:
            await session.rollback()
            print(f"Failed to create default user: {e}")


async def drop_tables():
    """
    Drop all database tables.
    Useful for development/testing.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
