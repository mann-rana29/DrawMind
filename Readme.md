
# DrawMind

DrawMind is a full-stack application for generating, editing, and rendering UML diagrams using natural language prompts and LLMs (Large Language Models). It supports PlantUML and integrates with Kroki for diagram rendering. The project is modular, extensible, and designed for both frontend and backend development.

## Features
- Generate UML diagrams from natural language prompts using LLMs
- Edit diagrams by describing changes in plain English
- Render diagrams to SVG using Kroki
- User authentication and registration (JWT-ready)
- Modular service and schema structure for easy extension
- Pydantic models for robust validation


## Folder Structure
```
frontend/          # Frontend app (UI, coming soon)
Backend/
	app/
		api/           # FastAPI route handlers
		services/      # Business logic and integrations (LLM, Kroki, etc.)
		schemas/       # Pydantic models for requests and responses
		main.py        # FastAPI app entry point
```


## Tech Stack
- Python 3.10+
- FastAPI (backend)
- Pydantic
- SQLAlchemy (planned)
- PlantUML, Kroki
- Google GenAI (Gemini)
- JWT/OAuth2 (planned)
- Frontend (framework coming soon)


## Setup (Backend)
1. Clone the repo
2. Create and activate a virtual environment
3. Install dependencies:
	```bash
	pip install -r requirements.txt
	```
4. Set up environment variables (see `.env.example`)
5. Run the FastAPI app:
	```bash
	uvicorn app.main:app --reload
	```

## Setup (Frontend)
Frontend code and setup instructions coming soon!

## API Endpoints (examples)
- `POST /generate_code` — Generate UML code from prompt
- `POST /render` — Render UML code to SVG
- `POST /register` — Register a new user
- `POST /login` — Authenticate and get a token

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT