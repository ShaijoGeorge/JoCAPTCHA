from fastapi import FastAPI
from .config import settings
from .redis_client import redis_test_connection
from .routes import challenge_routes

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

@app.on_event("startup")
def startup_event():
    redis_test_connection()

app.include_router(challenge_routes.router)