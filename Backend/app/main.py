from fastapi import FastAPI
from app.api import generate_router, render_router, chat_router , auth_router

from contextlib import asynccontextmanager
from app.database import create_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables() 
    yield

app = FastAPI(
    title="DrawMind",
    version="0.1.0",
    description="AI-powered UML diagram generation and editing platform",
    lifespan=lifespan
)


app.include_router(
    generate_router,
    prefix="/api/v1",
    tags=["generation"]
)

app.include_router(
    render_router,
    prefix="/api/v1",
    tags=["rendering"]
)

app.include_router(
    chat_router,
    prefix="/api/v1", 
    tags=["chat"]
)


app.include_router(
    auth_router,
    prefix="/api/v1/auth",
    tags=["authentication"]
)