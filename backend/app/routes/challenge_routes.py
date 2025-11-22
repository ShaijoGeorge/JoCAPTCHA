from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.models.verify import VerifyRequest
from app.services.challenge_service import generate_odd_one_out_challenge, verify_challenge

router = APIRouter(prefix="/challenge", tags=["challenge"])

@router.get("/test")
def test_route():
    return {"status": "OK", "message": "Challenge route working!"}

@router.get("/generate")
def generate_challenge():
    data = generate_odd_one_out_challenge()

    # do not ssend answer to frontend
    safe_data = {
        "challengeId": data["challengeId"],
        "type": data["type"],
        "prompt": data["prompt"],
        "images": data["images"],
        "timeout": 20
    }

    return JSONResponse(content=safe_data)

@router.post("/verify")
def verify(request: VerifyRequest):
    result = verify_challenge(
        challenge_id=request.challengeId,
        user_answer=request.answer,
        time_taken=request.timeTaken
    )

    return JSONResponse(content=result)