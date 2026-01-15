"""
llm_service.py: Business logic for LLM code generation
"""

import re
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
            model="gemini-2.5-flash-lite",
            config=types.GenerateContentConfig(
                system_instruction=system_instruct,
                temperature=0.7,
                top_p=0.5,
            ),
            contents=f"{text}"
        )
        
        # Clean up the response using Regex to find the PlantUML block
        raw_text = response.text.strip()
        
        # Look for @startuml ... @enduml
        match = re.search(r'(@startuml.*?@enduml)', raw_text, re.DOTALL)
        if match:
            return match.group(1)
            
        # Fallback: existing stripping logic if regex doesn't match (e.g. maybe just code without tags?)
        # But PlantUML usually requires tags. If not found, return cleaned text.
        cleaned_text = raw_text
        if cleaned_text.startswith("```"):
            cleaned_text = "\n".join(cleaned_text.split("\n")[1:])
            if cleaned_text.endswith("```"):
                cleaned_text = cleaned_text[:-3].strip()
        
        return cleaned_text
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
             raise Exception(f"RATE_LIMIT_EXCEEDED: {error_msg}")
        raise Exception(f"LLM code generation failed: {e}")
def generate_prompt(text : str) -> str:
    try:
        system_instruct = get_system_instruction_for_prompt()
        response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                config=types.GenerateContentConfig(
                    system_instruction= system_instruct,
                    temperature=0.7,
                    top_p=0.5,
                ),
                contents= f"{text} and the code language is plantuml "   
        )
        return response.text
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
             raise Exception(f"RATE_LIMIT_EXCEEDED: {error_msg}")
        raise Exception(f"Error while generating prompt : {e}")