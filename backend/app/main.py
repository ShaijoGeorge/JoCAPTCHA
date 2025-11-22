from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from .config import settings
from .redis_client import redis_test_connection
from .routes import challenge_routes

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).resolve().parent / "assets"),
    name="static",
)

@app.on_event("startup")
def startup_event():
    redis_test_connection()

app.include_router(challenge_routes.router)