from fastapi import APIRouter, HTTPException
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