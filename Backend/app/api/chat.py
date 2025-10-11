from fastapi import APIRouter, HTTPException , Depends
from sqlalchemy import select
from app.database import get_db , AsyncSession
from app.models import Diagram, ChatHistory
from app.schemas import Response
from app.services import generate_code_llm,generate_prompt
from pydantic import BaseModel

router  = APIRouter()

class GenerateRequest(BaseModel):
    prompt: str  # The user's natural language prompt

@router.post("/diagrams/{diagram_id}/chat", response_model=Response)
async def continue_chat(diagram_id : int , request : GenerateRequest, db : AsyncSession = Depends(get_db)):
    try:
        diagram = await db.get(Diagram,diagram_id)
        if not diagram:
            raise HTTPException(status_code=404, detail="Diagram not found")

        chat_history = await db.execute(
            select(ChatHistory).filter(ChatHistory.diagram_id  ==  diagram_id).order_by(ChatHistory.message_order)
        )
        previous_messages = chat_history.scalars().all()

        context = f"Current diagram: \n{diagram.plantuml_code} \n\n"
        context += "Previous conversation: \n"
        for msg in previous_messages:
            context += f"User : {msg.user_message}\nAI: {msg.ai_response}\n\n"
        context += f"User : {request.prompt}\n"

        optimized_prompt = generate_prompt(context)
        updated_code = generate_code_llm(optimized_prompt)

        diagram.plantuml_code = updated_code

        next_order  = len(previous_messages) + 1
        new_chat = ChatHistory(
            diagram_id = diagram_id,
            user_message  = request.prompt,
            ai_response = updated_code,
            message_order = next_order
        )
        db.add(new_chat)

        await db.commit()

        return Response(
            success= True,
            data = {
                "diagram_id" : diagram_id,
                "code" : updated_code,
                "message_order": next_order
            },
            message = "Chat continued successfully"
        )
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail = f"Failed to continue chat : {str(e)}")