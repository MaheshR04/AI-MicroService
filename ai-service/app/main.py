from fastapi import FastAPI
from app.routers import analyze

app = FastAPI(
    title="CX Guardian AI Service",
    description="Microservice handling vector embeddings, sentiment analysis, and autopilot classification",
    version="1.0.0"
)

# Include endpoint routers
app.include_router(analyze.router, prefix="/api/v1/analyze", tags=["Analysis"])

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "service": "cx-guardian-ai-service",
        "version": "1.0.0"
    }
