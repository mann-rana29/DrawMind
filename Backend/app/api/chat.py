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

        # Get only the last 3 messages for context (to keep prompt size manageable)
        chat_history = await db.execute(
            select(ChatHistory)
            .filter(ChatHistory.diagram_id == diagram_id)
            .order_by(ChatHistory.message_order.desc())
            .limit(3)  # Only last 3 messages
        )
        recent_messages = list(reversed(chat_history.scalars().all()))  # Reverse to chronological order

        # Build optimized context with limited history
        context = f"""TASK: Update the existing PlantUML diagram based on the user's request.

                    CURRENT DIAGRAM:
                    {diagram.plantuml_code}

                    RECENT CONVERSATION (last 3 messages):
                    """
        for msg in recent_messages:
            context += f"User: {msg.user_message}\nAI: Modified diagram\n\n"
        
        context += f"""NEW USER REQUEST: {request.prompt}

        INSTRUCTIONS: 
        - Take the CURRENT DIAGRAM above and MODIFY it according to the NEW USER REQUEST
        - KEEP all existing elements unless specifically asked to remove them
        - ADD the new elements/interactions requested by the user
        - Return the COMPLETE updated PlantUML diagram with both old and new elements
        - Do NOT create a new diagram from scratch"""

        optimized_prompt = generate_prompt(context)
        updated_code = generate_code_llm(optimized_prompt)

        diagram.plantuml_code = updated_code

        # Get the actual message count for proper ordering
        total_messages_result = await db.execute(
            select(ChatHistory).filter(ChatHistory.diagram_id == diagram_id)
        )
        total_messages = len(total_messages_result.scalars().all())
        next_order = total_messages + 1
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