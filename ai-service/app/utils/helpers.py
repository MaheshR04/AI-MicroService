import re

def clean_text(text: str) -> str:
    # Lowercase and clean special chars
    text = text.lower().strip()
    text = re.sub(r"[^\w\s\-\#\/\_]", "", text)
    return text
