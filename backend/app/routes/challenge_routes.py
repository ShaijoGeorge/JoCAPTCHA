from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services.challenge_service import generate_odd_one_out_challenge

router = APIRouter(prefix="/challenge", tags=["challenge"])

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