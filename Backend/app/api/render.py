from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.schemas import Response
from app.services import kroki_rendering_svg

router = APIRouter()

class RenderRequest(BaseModel):
    diagram_code: str

@router.post("/render",response_model=Response)
async def render(request :RenderRequest):
    try:
        svg_code = kroki_rendering_svg(request.diagram_code)

        return Response(
            success=True,
            data={"svg" : svg_code},
            message="Rendered Image Successfully"

        )
    except Exception as e:
        raise HTTPException(status_code=500, detail= f"Unable to render svg : {e}")
