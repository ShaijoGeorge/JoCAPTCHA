import uuid
import random
import json
import os
from pathlib import Path
from app.redis_client import redis_client

ASSETS_PATH = Path(__file__).resolve().parent.parent / "assets" / "odd_one_out"

def generate_odd_one_out_challenge():
    # 1. list all PNG images in folder
    if not ASSETS_PATH.exists():
        # create directory if it doesn't exist to avoid crashes
        ASSETS_PATH.mkdir(parents=True, exist_ok=True)
        return {"error": "Assets directory missing."}

    files = [f.name for f in ASSETS_PATH.glob("*.png")]
    
    if len(files) < 2:
        return {
            "challengeId": "error",
            "type": "error",
            "prompt": "No images found. Please add PNGs to backend/app/assets/odd_one_out/",
            "images": [],
            "timeout": 20
        }
    
    # 2. Select one "Odd" image
    odd = random.choice(files)

    # 3. Select 4 "Normal" images (different from odd)
    available_normals = [f for f in files if f != odd]

    if len(available_normals) >= 4:
        normals = random.sample(available_normals, 4)
    else:
        normals = random.choices(available_normals, k=4)

    # 4. Combine and Shuffle
    chosen_images = [odd] + normals
    random.shuffle(chosen_images)

    # 5. Find the correct answer (index of the odd image)
    odd_index = chosen_images.index(odd)

    challenge_id = str(uuid.uuid4())

    # 6. Generate the response payload
    challenge_data = {
        "challengeId": challenge_id,
        "type": "odd_one_out",
        "prompt": "Tap the image that does NOT belong.",
        "images": [f"http://127.0.0.1:8000/assets/odd_one_out/{img}" for img in chosen_images],
        "timeout": 20
    }

    # 7. Store in Redis with 120 second expiry
    redis_data = {
        "answer": odd_index,
        "type": "odd_one_out"
    }
    redis_client.setex(challenge_id, 120, json.dumps(redis_data))
    
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