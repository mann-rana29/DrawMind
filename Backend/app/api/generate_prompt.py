from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
from get_system_instruction import get_system_instruction_for_prompt

load_dotenv()
gemini_key = os.getenv('GEMINI_API_KEY')
system_instruct = get_system_instruction_for_prompt()

client = genai.Client(api_key=gemini_key)

def generate_prompt(text : str , code_lan : str):
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
# print(generate_prompt("create sequence dig of banking system" , "plantuml"))