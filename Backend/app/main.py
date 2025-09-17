from fastapi import FastAPI
from app.api import generate_router
# from app.api import render_router  # Uncomment when implemented
# from app.api import edit_router    # Uncomment when implemented

app = FastAPI(
    title="DrawMind",
    version="0.1.0",
    description="AI-powered UML diagram generation and editing platform"
)

# Register your API routers
app.include_router(
    generate_router,
    prefix="/api/v1",
    tags=["generation"]
)

# Add more routers as you implement them:
# app.include_router(render_router, prefix="/api/v1", tags=["rendering"])
# app.include_router(edit_router, prefix="/api/v1", tags=["editing"])