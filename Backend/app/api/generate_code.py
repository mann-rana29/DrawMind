from app.services.llm_service import generate_code_llm

def generate_code(text: str):
    """
    API handler for code generation. Calls service layer.
    """
    try:
        return generate_code_llm(text)
    except Exception as e:
        # Return error message or raise as needed
        return {"error": str(e)}