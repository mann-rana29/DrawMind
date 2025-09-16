"""
llm_service.py: Business logic for LLM code generation
"""

from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
from app.services.get_system_instruction import get_system_instruction_for_code, get_system_instruction_for_prompt

load_dotenv()
gemini_key = os.getenv('GEMINI_API_KEY')

client = genai.Client(api_key=gemini_key)

def generate_code_llm(text: str) -> str:
    """
    Generate code using Gemini LLM.
    Args:
        text (str): The prompt or input text.
    Returns:
        str: The generated code as a string.
    Raises:
        Exception: If LLM call fails.
    """
    try:
        system_instruct = get_system_instruction_for_code()
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                system_instruction=system_instruct,
                temperature=0.7,
                top_p=0.5,
            ),
            contents=f"{text}"
        )
        return response.text
    except Exception as e:
        # Log or handle error as needed
        raise Exception(f"LLM code generation failed: {e}")
def generate_prompt(text : str , code_lan : str) -> str:
    try:
        system_instruct = get_system_instruction_for_prompt()
        response = client.models.generate_content(
                model="gemini-2.5-flash",
                config=types.GenerateContentConfig(
                    system_instruction= system_instruct,
                    temperature=0.7,
                    top_p=0.5,
                ),
                contents= f"{text} and the code language is {code_lan} "   
        )
        return response.text
    except Exception as e:
        raise Exception(f"Error while generating prompt : {e}")