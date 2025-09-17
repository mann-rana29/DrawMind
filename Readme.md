

# DrawMind 🚀🧠

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-green.svg)](https://fastapi.tiangolo.com/)

DrawMind is a modern, full-stack platform for generating, editing, and visualizing UML diagrams from natural language prompts. Powered by advanced LLMs and seamless PlantUML integration, DrawMind empowers users to create and modify diagrams effortlessly—no technical expertise required. The project is architected for scalability, extensibility, and rapid development, with a robust backend and a user-friendly frontend (coming soon).

## ✨ Features

- 🤖 **LLM-Powered Generation**: Generate UML diagrams from natural language prompts using Google Gemini
- 📝 **Natural Language Editing**: Edit diagrams by describing changes in plain English
- 🖼️ **SVG Rendering**: Render diagrams to high-quality SVG using Kroki
- 🔒 **Secure Authentication**: JWT-based user authentication and registration
- 🧩 **Modular Architecture**: Clean separation of services, schemas, and APIs for easy extension
- ✅ **Robust Validation**: Pydantic models for type-safe data validation
- 🌐 **Cloud Database**: PostgreSQL integration with Supabase or Neon
- 🚀 **FastAPI Backend**: High-performance async API with automatic OpenAPI docs

## 📁 Project Structure

```
drawmind/
├── frontend/          # React/Next.js frontend (coming soon)
├── Backend/
│   ├── app/
│   │   ├── api/           # FastAPI route handlers
│   │   ├── services/      # Business logic (LLM, Kroki, etc.)
│   │   ├── schemas/       # Pydantic models
│   │   └── main.py        # FastAPI app entry point
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment variables template
├── assets/            # Screenshots, demos, logos
├── tests/             # Unit and integration tests
└── docs/              # Additional documentation
```

## 🛠️ Tech Stack

### Backend
- **Python 3.10+**
- **FastAPI** - Modern, fast web framework
- **Pydantic** - Data validation and serialization
- **SQLAlchemy** - ORM for database operations
- **Google GenAI (Gemini)** - LLM integration
- **PlantUML + Kroki** - Diagram generation and rendering
- **JWT/OAuth2** - Authentication
- **PostgreSQL** - Database (via Supabase/Neon)

### Frontend (Planned)
- **React/Next.js** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

## 🚦 Getting Started

### Prerequisites
- Python 3.10 or higher
- Git
- A Supabase or Neon account for database

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mann-rana29/DrawMind.git
   cd DrawMind
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp Backend/.env.example Backend/.env
   # Edit .env with your API keys and database URL
   ```

5. **Set up your database**
   - Create a PostgreSQL instance on [Supabase](https://supabase.com/) or [Neon](https://neon.tech/)
   - Update your database URL in `.env`

6. **Run the FastAPI app**
   ```bash
   cd Backend
   uvicorn app.main:app --reload
   ```

7. **Access the API**
   - OpenAPI docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Frontend Setup (Coming Soon)
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Documentation

### Authentication Endpoints
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

```http
POST /auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

### Diagram Endpoints
```http
POST /diagrams/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Create a class diagram for a library management system"
}
```

```http
POST /diagrams/render
Authorization: Bearer <token>
Content-Type: application/json

{
  "diagram_code": "@startuml\nclass Book {}\n@enduml",
  "diagram_type": "plantuml"
}
```

```http
PUT /diagrams/{diagram_id}/edit
Authorization: Bearer <token>
Content-Type: application/json

{
  "edit_prompt": "Add a new class called 'Member' with attributes name and email"
}
```

## 🔧 Environment Variables

Create a `.env` file in the `Backend/` directory:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# LLM API
GEMINI_API_KEY=your_gemini_api_key_here

# Kroki Service
KROKI_URL=https://kroki.io

# JWT
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# App Settings
DEBUG=True
```

## 🧪 Testing

```bash
# Run unit tests
pytest tests/

# Run with coverage
pytest --cov=app tests/

# Run integration tests
pytest tests/integration/
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build the image
docker build -t drawmind .

# Run the container
docker run -p 8000:8000 drawmind
```

### Cloud Deployment
- **Backend**: Deploy to Heroku, Railway, or Vercel
- **Database**: Use Supabase or Neon for managed PostgreSQL
- **Frontend**: Deploy to Vercel or Netlify

## 🗺️ Roadmap

- [ ] Frontend UI with React/Next.js
- [ ] Real-time diagram editing with WebSockets
- [ ] Support for Mermaid diagrams
- [ ] Diagram sharing and collaboration features
- [ ] Mobile app with React Native
- [ ] Integration with popular design tools
- [ ] Advanced LLM fine-tuning for diagram generation

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 style guidelines
- Write tests for new features
- Update documentation as needed
- Use meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Author**: Mann Rana
- **GitHub**: [@mann-rana29](https://github.com/mann-rana29)
- **Email**: [Mann.120528@stu.upes.ac.in]
- **Project Link**: [https://github.com/mann-rana29/DrawMind](https://github.com/mann-rana29/DrawMind)

---

<p align="center">Made with ❤️ and lots of ☕</p>
