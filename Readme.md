

# DrawMind 🚀🧠

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-green.svg)](https://fastapi.tiangolo.com/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT-orange.svg)](https://jwt.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)](https://www.postgresql.org/)

**DrawMind** is an intelligent, AI-powered platform that revolutionizes UML diagram creation through natural language processing. Transform your ideas into professional diagrams instantly using conversational prompts, edit them with simple descriptions, and share them seamlessly. Built with enterprise-grade architecture, complete authentication system, and scalable cloud infrastructure.

> **🎉 Latest Update:** Full authentication system implemented with JWT tokens, user management, and multi-user support!

## 🌟 What Makes DrawMind Special?

- **💬 Conversational Interface**: "Create a login system class diagram" → Professional UML diagram
- **🔄 Natural Language Editing**: "Add a password reset feature" → Diagram automatically updated  
- **🔐 Enterprise Security**: JWT authentication, user sessions, and data isolation
- **⚡ Real-time Processing**: Powered by Google Gemini AI for instant diagram generation
- **🎨 High-Quality Output**: Professional SVG diagrams via Kroki integration
- **🌐 Multi-User Ready**: Complete user management and diagram ownership

## ✨ Core Features

### 🤖 AI-Powered Diagram Generation
- **Natural Language Processing**: Convert plain English descriptions into UML diagrams
- **Google Gemini Integration**: Advanced LLM for context-aware diagram creation
- **Multiple Diagram Types**: Class, sequence, use case, and activity diagrams

### 🔐 Complete Authentication System
- **User Registration & Login**: Secure account creation with email validation
- **JWT Token Authentication**: Stateless, secure API access
- **Password Security**: BCrypt hashing with 72-byte limit handling
- **User Session Management**: Token-based authentication for all endpoints

### 📝 Intelligent Diagram Editing
- **Conversational Updates**: "Add a new method to the User class"
- **Context-Aware Changes**: AI understands existing diagram structure
- **Version History**: Track changes and iterations (coming soon)

### 🎨 Professional Rendering
- **High-Quality SVG Output**: Crisp, scalable diagrams via Kroki
- **Multiple Export Formats**: SVG, PNG, PDF support
- **Custom Styling**: Configurable themes and layouts

### 🏗️ Enterprise Architecture
- **Async FastAPI Backend**: High-performance, production-ready API
- **PostgreSQL Database**: Reliable data persistence with Neon cloud database
- **Modular Design**: Clean separation of concerns for easy maintenance
- **Comprehensive Error Handling**: Graceful failure management and recovery

## 📁 Project Architecture

```
📦 DrawMind/
├──🖥️ frontend/                    # React frontend (Next.js - coming soon)
├──🔧 Backend/
   ├──📱 app/
   │   ├── 🛣️ api/                 # REST API endpoints
   │   │   ├── auth.py            # 🔐 Authentication (register, login, /me)
   │   │   ├── generate_code.py   # 🤖 AI diagram generation
   │   │   ├── chat.py            # 💬 Conversational editing
   │   │   └── render.py          # 🎨 SVG rendering via Kroki
   │   ├── 🔧 services/           # Business logic layer
   │   │   ├── llm_service.py     # 🧠 Google Gemini integration
   │   │   ├── kroki_service.py   # 🖼️ Diagram rendering
   │   │   └── export_service.py  # 📤 File export utilities
   │   ├── 🔐 auth/               # Authentication system
   │   │   ├── auth.py            # JWT token management
   │   │   ├── password.py        # BCrypt password hashing
   │   │   └── dependencies.py    # Auth middleware
   │   ├── 📋 schemas/            # Pydantic data models
   │   │   ├── auth_schema.py     # User, login, token models
   │   │   ├── diagram_schema.py  # Diagram data structures
   │   │   └── response_schema.py # API responses
   │   ├── 🗄️ models.py           # SQLAlchemy database models
   │   ├── 💾 database.py         # Database connection & sessions
   │   └── 🚀 main.py             # FastAPI application entry
   ├── 📦 requirements.txt        # Python dependencies
   └── ⚙️ .env.example           # Environment configuration template
```

## 🛠️ Technology Stack

### 🔧 Backend (Production Ready)
| Technology | Purpose | Version |
|------------|---------|---------|
| **Python** | Core language | 3.10+ |
| **FastAPI** | Web framework | 0.116.1 |
| **SQLAlchemy** | ORM & database | 2.0+ (Async) |
| **PostgreSQL** | Primary database | Cloud (Neon) |
| **Google Gemini** | AI/LLM integration | Latest API |
| **Kroki** | Diagram rendering | Cloud service |
| **JWT/BCrypt** | Authentication | python-jose + bcrypt |
| **Pydantic** | Data validation | 2.11+ |
| **Uvicorn** | ASGI server | Production ready |

### 🎨 Frontend (Coming Soon)
| Technology | Purpose | Status |
|------------|---------|--------|
| **Next.js 14** | React framework | Planned |
| **TypeScript** | Type safety | Planned |
| **Tailwind CSS** | Styling | Planned |
| **Shadcn/ui** | Component library | Planned |
| **React Query** | Data fetching | Planned |

### ☁️ Infrastructure
- **Database**: Neon PostgreSQL (Serverless)
- **Deployment**: Railway/Vercel (Planned)
- **CI/CD**: GitHub Actions (Planned)
- **Monitoring**: Sentry integration (Available)

## � Quick Start Guide

### 📋 Prerequisites
- **Python 3.10+** installed
- **Git** for version control
- **Neon Account** for PostgreSQL database ([Get one free](https://neon.tech/))
- **Google AI API Key** for Gemini ([Get yours here](https://makersuite.google.com/app/apikey))

### ⚡ One-Command Setup

```bash
# Clone and setup in one go
git clone https://github.com/mann-rana29/DrawMind.git
cd DrawMind/Backend
python -m venv venv
# Windows
venv\Scripts\activate && pip install -r requirements.txt
# macOS/Linux  
source venv/bin/activate && pip install -r requirements.txt
```

### 🔧 Configuration

1. **Create your environment file**
   ```bash
   cp .env.example .env
   ```

2. **Configure your `.env` file**
   ```env
   # 🗄️ Database (Get from Neon.tech)
   DATABASE_URL=postgresql+asyncpg://user:pass@host/db
   
   # 🤖 AI Integration (Get from Google AI)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # 🔐 Security (Generate strong keys)
   SECRET_KEY=your-super-secret-jwt-key
   JWT_SECRET_KEY=your-jwt-specific-secret
   
   # 🎨 Services
   KROKI_URL=https://kroki.io
   ```

3. **Launch the application**
   ```bash
   uvicorn app.main:app --reload
   ```

### 🎯 First Steps

1. **Visit the API docs**: http://localhost:8000/docs
2. **Register a new user** via `/api/v1/auth/register`
3. **Login** to get your JWT token via `/api/v1/auth/login`
4. **Authorize** in the docs using the 🔒 button
5. **Generate your first diagram** via `/api/v1/generate`

### 🖥️ API Playground

The FastAPI interactive docs provide a complete playground:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 📡 API Reference

### 🔐 Authentication Endpoints

#### Register New User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com", 
  "password": "securepassword123"
}

# Response
{
  "id": 1,
  "username": "johndoe"
}
```

#### User Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}

# Response
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer <your_jwt_token>

# Response
{
  "id": 1,
  "username": "johndoe"
}
```

### 🤖 AI Diagram Generation

#### Generate New Diagram
```http
POST /api/v1/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Create a class diagram for a library management system with books, members, and loans"
}

# Response
{
  "diagram_id": 123,
  "plantuml_code": "@startuml\nclass Book {\n  +title: String\n  +author: String\n}\nclass Member {\n  +name: String\n  +email: String\n}\nclass Loan {\n  +date: Date\n  +returnDate: Date\n}\nBook ||--o{ Loan\nMember ||--o{ Loan\n@enduml",
  "explanation": "Created a library management system with three main classes..."
}
```

### 🎨 Diagram Rendering

#### Render to SVG
```http
POST /api/v1/render
Authorization: Bearer <token>
Content-Type: application/json

{
  "diagram_code": "@startuml\nclass Book {}\n@enduml",
  "diagram_type": "plantuml"
}

# Response
{
  "svg_content": "<svg xmlns='http://www.w3.org/2000/svg'>...</svg>",
  "success": true
}
```

### 💬 Conversational Editing

#### Continue Diagram Chat
```http
POST /api/v1/chat/{diagram_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Add a new class called 'Author' and connect it to Book"
}

# Response
{
  "response": "I've added an Author class with a relationship to Book...",
  "updated_code": "@startuml\nclass Book {}\nclass Author {}\nAuthor ||--o{ Book\n@enduml"
}
```

## ⚙️ Environment Configuration

### 📝 Complete `.env` Setup

Create a `.env` file in the `Backend/` directory with these variables:

```env
# 🗄️ DATABASE CONFIGURATION
DATABASE_URL=postgresql+asyncpg://username:password@host:port/database_name
# Example: postgresql+asyncpg://user:pass@ep-cool-cloud-123456.us-east-1.aws.neon.tech/drawmind

# 🤖 AI/LLM INTEGRATION  
GEMINI_API_KEY=your_google_gemini_api_key_here
# Get from: https://makersuite.google.com/app/apikey

# 🔐 AUTHENTICATION & SECURITY
SECRET_KEY=your-super-long-secret-key-for-general-app-security
JWT_SECRET_KEY=your-specific-jwt-token-signing-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# 🎨 EXTERNAL SERVICES
KROKI_URL=https://kroki.io
# Alternative: http://localhost:8080 (if self-hosting Kroki)

# 🔧 APPLICATION SETTINGS
DEBUG=True
LOG_LEVEL=INFO
ENVIRONMENT=development

# 📊 OPTIONAL: MONITORING & ANALYTICS
SENTRY_DSN=your_sentry_dsn_for_error_tracking
```

### 🔑 How to Get API Keys

1. **Google Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with Google account
   - Click "Create API Key"
   - Copy and paste into your `.env`

2. **Neon Database URL**:
   - Sign up at [Neon.tech](https://neon.tech/)
   - Create a new project
   - Copy the connection string from your dashboard
   - Replace `postgresql://` with `postgresql+asyncpg://`

3. **JWT Secret Keys**:
   ```bash
   # Generate secure random keys
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

### 🔒 Security Best Practices

- ✅ Use different keys for `SECRET_KEY` and `JWT_SECRET_KEY`
- ✅ Never commit `.env` file to version control
- ✅ Use strong, randomly generated secrets (32+ characters)
- ✅ Set appropriate token expiration times
- ✅ Enable SSL/TLS in production (`ssl=require` in DATABASE_URL)


## 🗺️ Development Roadmap

### ✅ Completed (v1.0)
- [x] **Core AI Engine**: Google Gemini integration for diagram generation
- [x] **Authentication System**: JWT-based user registration, login, and session management
- [x] **Database Layer**: PostgreSQL with SQLAlchemy ORM and async support
- [x] **API Framework**: FastAPI with automatic OpenAPI documentation
- [x] **Diagram Rendering**: Kroki integration for high-quality SVG output
- [x] **Conversational Editing**: Natural language diagram modifications
- [x] **Security**: BCrypt password hashing, secure token management
- [x] **Error Handling**: Comprehensive error management and recovery

### 🚧 In Progress (v1.1)
- [ ] **Frontend Development**: React/Next.js UI implementation
- [ ] **User Experience**: Drag-and-drop diagram editor
- [ ] **Enhanced Workflows**: Multi-step diagram creation processes


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

## 🎯 Use Cases & Examples

### 🏢 Business Applications
- **System Architecture**: Generate microservices diagrams from requirements
- **Database Design**: Create ERD diagrams from business rules
- **Process Flows**: Document business processes visually
- **API Documentation**: Visualize REST API relationships

### 🎓 Educational Use
- **Software Engineering**: Teach UML concepts interactively
- **System Design**: Practice system architecture patterns
- **Code Documentation**: Generate diagrams from existing codebases
- **Project Planning**: Visualize project structures and dependencies

### 👨‍� Developer Workflow
- **Code Review**: Generate diagrams to explain complex features
- **Documentation**: Auto-generate architecture documentation
- **Onboarding**: Create visual guides for new team members
- **Technical Debt**: Visualize legacy system structures

## 🏆 Key Achievements

- 🚀 **Production-Ready Backend**: Complete FastAPI application with enterprise features
- 🔐 **Secure Authentication**: JWT-based system with BCrypt password protection
- 🤖 **AI Integration**: Advanced Google Gemini AI for intelligent diagram generation
- 📊 **Scalable Architecture**: Async database operations with connection pooling
- 📖 **Comprehensive Documentation**: Complete API docs with interactive playground
- 🧪 **Error Resilience**: Robust error handling for production environments

## 📞 Connect & Contribute

### 👨‍💻 Author
**Mann Rana** 
- **GitHub**: [@mann-rana29](https://github.com/mann-rana29)
- **Email**: Mann.120528@stu.upes.ac.in
- **LinkedIn**: [Connect with me](https://www.linkedin.com/in/mann-rana-024331275/)

### 🔗 Project Links
- **Repository**: [https://github.com/mann-rana29/DrawMind](https://github.com/mann-rana29/DrawMind)
- **Issues**: [Report bugs or request features](https://github.com/mann-rana29/DrawMind/issues)
- **Discussions**: [Join the community](https://github.com/mann-rana29/DrawMind/discussions)

### 💬 Community
- 🌟 **Star this repo** if you find it useful
- 🐛 **Report issues** to help improve the project  
- 💡 **Suggest features** for future development
- 🤝 **Contribute code** to make DrawMind even better

---

<div align="center">

### 🙏 Acknowledgments

Special thanks to:
- **Google AI** for Gemini API access
- **Neon** for serverless PostgreSQL
- **Kroki** for diagram rendering services
- **FastAPI Community** for the amazing framework

---

**Made with ❤️, ☕, and lots of 🤖 AI magic**

*"Transforming ideas into diagrams, one conversation at a time"*

</div>
