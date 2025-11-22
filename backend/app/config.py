import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", 6379))
    REDIS_DB: int = int(os.getenv("REDIS_DB", 0))

    APP_NAME: str = os.getenv("APP_NAME", "JoCAPTCHA")
    APP_VERSION: str = os.getenv("APP_VERSION", "0.1.0")

settings = Settings()