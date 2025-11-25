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
    # Randomly pick one of the 3 challenge types
    choice = random.choice(["odd_one_out", "drag_drop", "rotate"])

    if choice == "odd_one_out":
        data = generate_odd_one_out_challenge()
    elif choice == "drag_drop":
        data = generate_drag_drop_challenge()
    else:
        data = generate_rotate_challenge()

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