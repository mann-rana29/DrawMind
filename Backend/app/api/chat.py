from fastapi import APIRouter, HTTPException , Depends
from sqlalchemy import select
from app.database import get_db , AsyncSession
from app.models import Diagram, User, ChatHistory
from app.schemas import Response
from app.services import generate_code_llm,generate_prompt , kroki_rendering_svg_with_src
from app.auth.dependencies import get_current_user
from pydantic import BaseModel

router  = APIRouter()

class ChatRequest(BaseModel):
    message: str  # User's natural language message

# New endpoint for initializing chat with just a message
@router.post("/chat", response_model=Response)
async def start_chat(request: ChatRequest, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Start a new diagram conversation with a simple message.
    User sends a message, gets back a rendered SVG diagram.
    """
    try:
        # Generate optimized prompt and code
        optimized_prompt = generate_prompt(request.message)
        generated_code = generate_code_llm(optimized_prompt)
        
        # Render the diagram to SVG
        render_result = kroki_rendering_svg_with_src(generated_code)
        svg_content = render_result["svg_content"]

        # Create new diagram
        diagram = Diagram(
            owner_id=current_user.id,
            title=request.message[:100] + "..." if len(request.message) > 100 else request.message,  # Truncate long titles
            plantuml_code=generated_code,
            svg_content=svg_content
        )
        
        db.add(diagram)
        await db.flush()  # Get the diagram ID

        # Create initial chat message
        chat_message = ChatHistory(
            diagram_id=diagram.id,
            user_message=request.message,
            ai_response=generated_code,
            message_order=1
        )
        db.add(chat_message)
        await db.commit()

        return Response(
            success=True,
            data={
                "diagram_id": diagram.id,
                "svg_content": svg_content,
                "src": render_result["src"],
                "kroki_url": render_result["kroki_url"],
                "redirect_to_chat": True,  # Signal frontend to switch to chat mode
                "chat_endpoint": f"/api/v1/diagrams/{diagram.id}/chat",  # Ready-to-use endpoint
                "diagram_title": diagram.title,
                "message": f"Created diagram: {diagram.title}"
            },
            message="New diagram created successfully"
        )

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create diagram: {str(e)}"
        )

@router.post("/diagrams/{diagram_id}/chat", response_model=Response)
async def continue_chat(diagram_id : int , request : ChatRequest, db : AsyncSession = Depends(get_db) , current_user : User = Depends(get_current_user)):
    try:
        diagram = await db.get(Diagram,diagram_id)
        if not diagram:
            raise HTTPException(status_code=404, detail="Diagram not found")
        
        if diagram.owner_id != current_user.id : 
            raise HTTPException(status_code=403, detail="Not authorized to access this diagram")
        
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
        
        context += f"""NEW USER REQUEST: {request.message}

        INSTRUCTIONS: 
        - Take the CURRENT DIAGRAM above and MODIFY it according to the NEW USER REQUEST
        - KEEP all existing elements unless specifically asked to remove them
        - ADD the new elements/interactions requested by the user
        - Return the COMPLETE updated PlantUML diagram with both old and new elements
        - Do NOT create a new diagram from scratch"""

        optimized_prompt = generate_prompt(context)
        updated_code = generate_code_llm(optimized_prompt)
        render_result = kroki_rendering_svg_with_src(updated_code)
        updated_diagram = render_result["svg_content"]

        diagram.plantuml_code = updated_code
        diagram.svg_content = updated_diagram

        # Get the actual message count for proper ordering
        total_messages_result = await db.execute(
            select(ChatHistory).filter(ChatHistory.diagram_id == diagram_id)
        )
        total_messages = len(total_messages_result.scalars().all())
        next_order = total_messages + 1
        new_chat = ChatHistory(
            diagram_id = diagram_id,
            user_message  = request.message,
            ai_response = updated_code,
            message_order = next_order
        )
        db.add(new_chat)

        await db.commit()

        return Response(
            success= True,
            data = {
                "diagram_id" : diagram_id,
                "svg_content" : updated_diagram,
                "src": render_result["src"],
                "kroki_url": render_result["kroki_url"],
                "is_continuation": True,  # Signal this is a chat continuation
                "message_order": next_order,
                "diagram_title": diagram.title,
                "message": "Diagram updated successfully based on your request"
            },
            message = "Chat updated diagram successfully"
        )
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail = f"Failed to continue chat : {str(e)}")