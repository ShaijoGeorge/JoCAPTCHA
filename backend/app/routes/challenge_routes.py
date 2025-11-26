import json
from app.redis_client import redis_client
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import random
from app.models.verify import VerifyRequest
from app.services.challenge_service import (
    generate_odd_one_out_challenge,
    generate_drag_drop_challenge,
    generate_rotate_challenge,
    verify_challenge
)

router = APIRouter()

@router.get("/challenge/generate")
def generate_challenge():

    #1 Fetch settings frm Redis
    settings_raw = redis_client.get("captcha_settings")
    if settings_raw:
        settings = json.loads(settings_raw)
        enabled_types = settings.get("enabled_types", [])
        difficulty = settings.get("difficulty", 50)
    else:
        # fallback if no settings saved yet
        enabled_types = ["odd_one_out", "drag_drop", "rotate"]
        difficulty = 50

    #2 Safety check: ensure at least one type is active
    if not enabled_types:
        enabled_types = ["odd_one_out"]

    #3 Randomly pick one of the enabled challenge types
    choice = random.choice(enabled_types)

    if choice == "odd_one_out":
        data = generate_odd_one_out_challenge()
    elif choice == "drag_drop":
        data = generate_drag_drop_challenge(difficulty)
    else:
        data = generate_rotate_challenge(difficulty)

    # If folder was empty, generate_odd_one might return None
    if not data:
         return JSONResponse(content={"error": "No assets found"}, status_code=500)
        
    return JSONResponse(content=data)

@router.post("/challenge/verify")
def verify(request: VerifyRequest):
    result = verify_challenge(
        challenge_id=request.challengeId,
        user_answer=request.answer,
        time_taken=request.timeTaken
    )

    return JSONResponse(content=result)