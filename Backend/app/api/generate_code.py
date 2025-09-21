from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database import get_db
from app.services import generate_code_llm, generate_prompt
from app.schemas import Response
from pydantic import BaseModel

router = APIRouter()

class GenerateRequest(BaseModel):
    prompt: str  # The user's natural language prompt

@router.post("/generate", response_model=Response)
async def generate_code(request: GenerateRequest):
    """
    Generate UML diagram code from natural language prompt.
    This endpoint accepts a prompt and returns generated PlantUML code.
    """
    try:
        # Call your service layer
        optimized_prompt = generate_prompt(request.prompt)
        generated_code = generate_code_llm(optimized_prompt)

        # Return structured response
        return Response(
            success=True,
            data={"code": generated_code},
            message="Diagram code generated successfully"
        )

    except Exception as e:
        # Use HTTPException for proper error handling
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate diagram code: {str(e)}"
        )

@router.get("/test-db")
async def test_database(db: AsyncSession = Depends(get_db)):
    """
    Test endpoint to verify database connection and table existence.
    """
    try:
        # Check if tables exist
        result = await db.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        """))
        tables = [row[0] for row in result.fetchall()]
        
        return Response(
            success=True,
            data={"tables": tables},
            message=f"Database connected! Found {len(tables)} tables."
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database test failed: {str(e)}"
        )