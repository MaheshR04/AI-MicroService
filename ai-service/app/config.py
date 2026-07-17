import os

class Settings:
    PROJECT_NAME: str = "CX Guardian AI Service"
    MODEL_PATH: str = os.getenv("MODEL_PATH", "models/specialist_v1")
    EMBEDDING_DIMENSION: int = 384
    CONFIDENCE_THRESHOLD: float = 0.85

settings = Settings()
