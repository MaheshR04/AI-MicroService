from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class InputText(BaseModel):
    text: str

@router.post("/sentiment")
def analyze_sentiment(payload: InputText):
    # Mock inference
    text = payload.text.lower()
    sentiment = "Positive"
    score = 0.95
    
    if "error" in text or "fail" in text or "dispute" in text or "accident" in text:
        sentiment = "Neutral"
        score = 0.50
    if "angry" in text or "frustrated" in text or "refund" in text or "worst" in text:
        sentiment = "Negative"
        score = 0.15
        
    return {
        "sentiment": sentiment,
        "score": score
    }

@router.post("/intent")
def analyze_intent(payload: InputText):
    text = payload.text.lower()
    intent = "General Inquiry"
    
    if "refund" in text or "seat" in text or "bill" in text or "invoice" in text:
        intent = "Billing & Refunds"
    elif "dns" in text or "ssl" in text or "domain" in text or "deploy" in text:
        intent = "Technical & Binds"
    elif "mfa" in text or "key" in text or "token" in text or "login" in text:
        intent = "Security & Auth"
        
    return {
        "intent": intent,
        "confidence": 0.98
    }
