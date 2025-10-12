# API package initialization
# This file makes the 'api' directory a Python package
# and provides convenient imports for routers

from .generate_code import router as generate_router
from .render import router as render_router       
from .chat import router as chat_router
from .auth import router as auth_router           

# You can also import all routers at once:
__all__ = [
    "generate_router",
    "render_router",
    "chat_router",    
    "auth_router"  
]