import redis
from .config import settings

# If we are on Render (Upstash), the host won't be "localhost", so we use SSL.
# For local, default to "localhost", so we disable SSL.
ssl_enabled = settings.REDIS_HOST != "localhost"

redis_client = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB,
    decode_responses=True,
    ssl=ssl_enabled,
    ssl_cert_reqs=None
)

def redis_test_connection():
    try:
        redis_client.ping()
        print(f"Connected to Redis at {settings.REDIS_HOST} successfully!")
    except Exception as e:
        print(f"Redis connection failed:", e)