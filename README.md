# AI MicroService

Enterprise CX Guardian AI is a modular full-stack platform that combines a React frontend, an Express backend, and a Python FastAPI AI microservice for customer experience automation.

## Repository Structure

```text
AI MicroService/
├── ai-service/                 # Python FastAPI AI microservice
│   ├── app/
│   │   ├── agents/             # AI agent implementations
│   │   ├── api/                # API route modules
│   │   ├── conversation/       # Conversation lifecycle manager
│   │   ├── core/               # Config, logger, shared core utilities
│   │   ├── database/           # MongoDB connection layer
│   │   ├── middleware/         # Auth and request middleware
│   │   ├── models/             # Pydantic / domain models
│   │   ├── prompts/            # Prompt builders
│   │   ├── repositories/       # Persistence layer
│   │   ├── routers/            # FastAPI routers
│   │   ├── schemas/            # Request/response schemas
│   │   ├── services/           # Core business logic
│   │   └── utils/              # Helpers and exceptions
│   ├── requirements.txt
│   └── README.md
├── client/                     # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                     # Node.js + Express backend
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── package.json
├── docs/                       # Architecture notes, pitch deck, and sample requests
├── package.json                # Root workspace scripts
├── README.md                   # This file
└── .gitignore
```

## What’s Included

- React frontend with Vite and Tailwind styling
- Express backend for REST APIs and shared application logic
- Python FastAPI AI service for chat, reasoning, recommendation, and analytics flows
- JWT-based authentication and authorization
- Protected chat and conversation endpoints tied to authenticated users
- MongoDB-backed conversation and message persistence

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.10+
- MongoDB instance (local or Atlas)

### 1) Install dependencies

From the repository root:

```bash
npm install
```

For the Python microservice:

```bash
cd ai-service
pip install -r requirements.txt
```

### 2) Run the services

Start the frontend and backend together:

```bash
npm run dev
```

This runs:
- client: `npm run dev --workspace client`
- server: `npm run dev --workspace server`

Run the AI service separately:

```bash
cd ai-service
uvicorn app.main:app --reload --port 8000
```

### 3) Access the APIs

- Frontend: http://localhost:5173
- Node backend: http://localhost:5000
- AI service docs: http://localhost:8000/docs

## Environment Notes

Set up environment variables for the backend and AI service as needed, including:

- MongoDB connection URI
- JWT secret settings
- Groq API key and model configuration

## Notes

The AI microservice is intentionally modular and extends the existing chat flow without replacing the core service. Authentication is integrated into the FastAPI routes and conversation ownership is enforced at the repository and router layers.
