import requests
from dotenv import load_dotenv
import os
import re

load_dotenv()

kroki_url = os.getenv("KROKI_URL")


def extract_src_from_svg(svg_content: str):
    """Extract the src from SVG comment <!--SRC=[...]---> and return clean SVG + src value"""
    # Pattern to match <!--SRC=[content]-->
    src_pattern = r'<!--SRC=\[([^\]]+)\]-->'
    
    # Find the src value
    src_match = re.search(src_pattern, svg_content)
    src_value = src_match.group(1) if src_match else None
    
    # Remove the entire comment from SVG
    clean_svg = re.sub(src_pattern, '', svg_content)
    
    # Clean up any extra whitespace
    clean_svg = clean_svg.strip()
    
    return clean_svg, src_value


def kroki_rendering_svg(diagram_code : str):
    url = f"{kroki_url}/plantuml/svg"
    headers = {"Content-Type" : "text/plain"}
    try:
        response = requests.post(url,data=diagram_code.encode("utf-8"),headers = headers)
        response.raise_for_status()
        return response.text
    except Exception as e:
        raise Exception(f"Unable to render svg : {e}")


def kroki_rendering_svg_with_src(diagram_code: str):
    """Render SVG and return both clean SVG and src value separately"""
    url = f"{kroki_url}/plantuml/svg"
    headers = {"Content-Type" : "text/plain"}
    try:
        response = requests.post(url, data=diagram_code.encode("utf-8"), headers=headers)
        response.raise_for_status()
        
        # Extract and clean the SVG
        clean_svg, src_value = extract_src_from_svg(response.text)
        
        return {
            "svg_content": clean_svg,
            "src": src_value,
            "kroki_url": f"{kroki_url}/plantuml/svg/{src_value}" if src_value else None
        }
    except Exception as e:
        raise Exception(f"Unable to render svg : {e}")
