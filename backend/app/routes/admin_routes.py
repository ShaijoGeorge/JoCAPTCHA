import json
from fastapi import APIRouter
from app.models.settings import CaptchaSettings
from app.redis_client import redis_client

router = APIRouter()
SETTINGS_KEY = "captcha_settings"

@router.get("/admin/settings", response_model=CaptchaSettings)
def get_settings():
    # Fetch settings from Redis
    data = redis_client.get(SETTINGS_KEY)
    if data:
        return json.loads(data)
    
    # Return defaults if nothing saved
    return CaptchaSettings()

@router.post("/admin/settings")
def set_settings(settings: CaptchaSettings):
    # Save to Redis
    redis_client.set(SETTINGS_KEY, settings.json())
    return {"status": "success", "settings": settings}