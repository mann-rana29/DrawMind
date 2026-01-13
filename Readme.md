

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
