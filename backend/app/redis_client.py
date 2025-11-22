import redis
from .config import settings

redis_client = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB,
    decode_responses=True
)

def redis_test_connection():
    try:
        redis_client.ping()
        print("Connected to Redis successfully!")
    except Exception as e:
        print("Redis connection failed:", e)