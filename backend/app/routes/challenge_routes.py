from fastapi import APIRouter

router = APIRouter(prefix="/challenge", tags=["challenge"])

@router.get("/test")
def test_route():
    return {"status": "OK", "message": "Challenge route working!"}