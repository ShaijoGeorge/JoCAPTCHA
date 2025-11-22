from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from .config import settings
from .redis_client import redis_test_connection
from .routes import challenge_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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