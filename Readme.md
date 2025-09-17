

# DrawMind

DrawMind is a modern, full-stack platform for generating, editing, and visualizing UML diagrams from natural language prompts. Powered by advanced LLMs and seamless PlantUML integration, DrawMind empowers users to create and modify diagrams effortlessly—no technical expertise required. The project is architected for scalability, extensibility, and rapid development, with a robust backend and a user-friendly frontend (coming soon).

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
- **Python 3.10+**
- **FastAPI** (backend API)
- **Pydantic** (data validation)
- **Supabase** or **Neon** (PostgreSQL cloud database)
- **SQLAlchemy** (ORM, planned)
- **PlantUML**, **Kroki** (diagram rendering)
- **Google GenAI (Gemini)** (LLM integration)
- **JWT/OAuth2** (authentication, planned)
- **Frontend** (framework coming soon)



## Getting Started

### Backend
1. **Clone the repository**
2. **Create and activate a virtual environment**
3. **Install dependencies:**
	```bash
	pip install -r requirements.txt
	```
4. **Configure environment variables** (see `.env.example`)
5. **Set up your database:**
	- Provision a PostgreSQL instance using [Supabase](https://supabase.com/) or [Neon](https://neon.tech/)
	- Update your database URL in the environment config
6. **Run the FastAPI app:**
	```bash
	uvicorn app.main:app --reload
	```

### Frontend
Frontend code and setup instructions coming soon!


## Example API Endpoints
- `POST /generate_code` — Generate UML code from a natural language prompt
- `POST /render` — Render UML code to SVG
- `POST /register` — Register a new user
- `POST /login` — Authenticate and receive a secure token


## Contributing
We welcome contributions from the community! If you have ideas, suggestions, or bug fixes, please open an issue or submit a pull request. For major changes, start a discussion first to ensure alignment with the project vision.


## License
MIT — free for personal and commercial use.