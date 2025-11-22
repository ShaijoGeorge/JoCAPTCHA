import uuid
import random
import json
from datetime import datetime
from pathlib import Path
from app.redis_client import redis_client

ASSETS_PATH = Path(__file__).resolve().parent.parent / "assets" / "odd_one_out"

def generate_odd_one_out_challenge():
    # list all PNG images in folder
    files = [f for f in ASSETS_PATH.glob("*.png")]
    
    # pick 5 belonging images and 1 odd image
    belonging = files[:-1] # first 5 images
    odd = files[-1]    # last image is odd

    # choose 1 odd poition
    chosen_images = random.sample(belonging, 4) + [odd]
    random.shuffle(chosen_images)

    # find index of odd image
    odd_index = chosen_images.index(odd)

    challenge_id = str(uuid.uuid4())

    challenge_data = {
        "challengeId": challenge_id,
        "type": "odd_one_out",
        "prompt": "Tap the image that does NOT belong.",
        "images": [f"/static/odd_one_out/{img.name}" for img in chosen_images],
        "answer": odd_index
    }

    # Store in Redis with 120 second expiry
    redis_client.setex(challenge_id, 120, json.dumps(challenge_data))
    
    return challenge_data

def verify_challenge(challenge_id : str, user_answer: int, time_taken: int):
    # Fetch challenge data from Redis
    data = redis_client.get(challenge_id)

    if not data:
        return {"success": False, "reason": "Challenge expired or invalid."}

    challenge = json.loads(data)

    # Delete challenge immediately (one-time use)
    redis_client.delete(challenge_id)

    # Validate answer
    correct_answer = challenge["answer"]

    if user_answer != correct_answer:
        return {"success": False, "reason": "Incorrect answer."}
    
    # Validate time (too slow = expired)
    if time_taken > challenge.get("timeout", 20) * 1000:
        return {"success": False, "reason": "Challenge timed out."}

    # If everything is good:
    return {"success": True, "reason": "Verification successful."}