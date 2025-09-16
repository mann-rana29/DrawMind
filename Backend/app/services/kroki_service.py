from app.services.llm_service import generate_code_llm
import requests
from dotenv import load_dotenv
import os

load_dotenv()

kroki_url = os.getenv("KROKI_URL")


def render_svg(diagram_code : str , diagram_type : str):
    url = f"{kroki_url}/{diagram_type}/svg"
    headers = {"Content-Type" : "text/plain"}
    try:
        response = requests.post(url,data=diagram_code.encode("utf-8"),headers = headers)
        response.raise_for_status()
        return {"svg" : response.text}
    except Exception as e:
        raise Exception(f"Unable to render svg : {e}")
