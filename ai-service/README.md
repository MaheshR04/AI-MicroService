# Enterprise CX Guardian AI - Python Microservice

This service provides the AI-powered customer experience layer for the monorepo. It is built with FastAPI and exposes chat, conversation, authentication, and analytics endpoints.

## Service Structure

```text
ai-service/
├── app/
│   ├── agents/               # Agent implementations
│   ├── api/                  # Auth and API route modules
│   ├── conversation/         # Conversation manager
│   ├── core/                 # Settings, logging, shared helpers
│   ├── database/             # MongoDB connection layer
│   ├── middleware/           # Authentication middleware
│   ├── models/               # Domain and schema models
│   ├── prompts/              # Prompt building logic
│   ├── repositories/         # MongoDB repository layer
│   ├── routers/              # FastAPI routers
│   ├── schemas/              # Request/response models
│   ├── services/             # Business logic for chat, auth, and AI
│   └── utils/                # Exceptions and helpers
├── requirements.txt
└── README.md
```

## Key Capabilities

- JWT-based authentication and authorization
- Protected chat and conversation endpoints
- User-specific conversation ownership enforcement
- MongoDB-backed memory, message, prompt, and usage persistence
- REST endpoints for chat, sentiment, reasoning, recommendations, and analysis

## Quick Start

1. Create and activate a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start the service:

```bash
uvicorn app.main:app --reload --port 8000
```

4. Open the API docs:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Variables

Set the following values in your environment before running the service:

- MONGODB_URI
- DATABASE_NAME
- JWT_SECRET_KEY
- JWT_ALGORITHM
- GROQ_API_KEY
- MODEL_NAME

## Notes

The chat flow is implemented as an extension of the existing AI service and now includes authenticated user context and conversation ownership checks.
