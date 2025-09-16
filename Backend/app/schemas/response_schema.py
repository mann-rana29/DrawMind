from pydantic import BaseModel
from typing import Optional, Any

class Response(BaseModel):
    success: bool
    message: Optional[str] = None
    data: Optional[Any] = None
    error: Optional[str] = None


# Example schema for rendering requests
class RenderRequest(BaseModel):
    diagram_code: str
    diagram_type: str