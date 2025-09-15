from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()
gemini_key = os.getenv('GEMINI_API_KEY')


client = genai.Client(api_key=gemini_key)

# response = client.models.generate_content(
#     model="gemini-2.0-flash-001",
#     contents="when was ai founded in one line"
# )

# print(response.text)
for chunk in client.models.generate_content_stream(
    model='gemini-2.0-flash-001', contents='Tell me a story in 300 words.'
):
    print(chunk.text, end='')