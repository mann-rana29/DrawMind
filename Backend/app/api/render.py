from fastapi import APIRouter, HTTPException , Depends 
from pydantic import BaseModel
from app.schemas import Response
from app.services import kroki_rendering_svg
from app.database import AsyncSession , get_db
from app.models import Diagram


router = APIRouter()

class RenderRequest(BaseModel):
    diagram_id : int
    diagram_code: str

@router.post("/render",response_model=Response)
async def render(request :RenderRequest , db : AsyncSession = Depends(get_db)):
    try:
        svg_code = kroki_rendering_svg(request.diagram_code)
        diagram = await db.get(Diagram , request.diagram_id)

        if not diagram:
            raise HTTPException(status_code=404 , detail="Diagram not found")

        diagram.svg_content = svg_code
        diagram.plantuml_code = request.diagram_code

        await db.commit()

        return Response(
            success=True,
            data={"svg" : svg_code},
            message="Rendered Image Successfully"

        )
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail= f"Unable to render svg : {e}")
