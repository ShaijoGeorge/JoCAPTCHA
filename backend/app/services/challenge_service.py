import uuid
import random
import json
import os
from pathlib import Path
from app.redis_client import redis_client

ASSETS_PATH = Path(__file__).resolve().parent.parent / "assets" / "odd_one_out"

def generate_odd_one_out_challenge():
    # Check if directory exists
    if not ASSETS_PATH.exists():
        ASSETS_PATH.mkdir(parents=True, exist_ok=True)
        return {
            "challengeId": "error",
            "type": "error",
            "prompt": "Assets directory missing.",
            "images": [],
            "timeout": 20
        }

    # Get subdirectories (categories)
    categories = [d for d in ASSETS_PATH.iterdir() if d.is_dir()]
    
    if len(categories) < 2:
        return {
            "challengeId": "error",
            "type": "error",
            "prompt": "Need at least 2 categories of images (e.g., fruits and objects)",
            "images": [],
            "timeout": 20
        }
    
    # Pick 2 different categories randomly
    odd_category, normal_category = random.sample(categories, 2)
    
    # Get images from each category
    odd_images = [f.name for f in odd_category.glob("*.png")]
    normal_images = [f.name for f in normal_category.glob("*.png")]
    
    if not odd_images:
        return {
            "challengeId": "error",
            "type": "error",
            "prompt": f"No images found in {odd_category.name}/",
            "images": [],
            "timeout": 20
        }
    
    if len(normal_images) < 5:
        return {
            "challengeId": "error",
            "type": "error",
            "prompt": f"Need at least 5 images in {normal_category.name}/ (found {len(normal_images)})",
            "images": [],
            "timeout": 20
        }
    
    # Select one odd image
    odd = random.choice(odd_images)
    odd_path = f"{odd_category.name}/{odd}"
    
    # Select 5 normal images
    normals = random.sample(normal_images, 5)
    normal_paths = [f"{normal_category.name}/{img}" for img in normals]
    
    # Combine and shuffle
    chosen_images = [odd_path] + normal_paths
    random.shuffle(chosen_images)
    
    # Find the correct answer (index of the odd image)
    odd_index = chosen_images.index(odd_path)
    
    challenge_id = str(uuid.uuid4())
    
    challenge_data = {
        "challengeId": challenge_id,
        "type": "odd_one_out",
        "prompt": "Tap the image that does NOT belong.",
        "images": [f"http://127.0.0.1:8000/assets/odd_one_out/{img}" for img in chosen_images],
        "timeout": 20
    }
    
    redis_data = {
        "answer": odd_index,
        "type": "odd_one_out"
    }
    redis_client.setex(challenge_id, 120, json.dumps(redis_data))
    
    return challenge_data

def verify_challenge(challenge_id: str, user_answer: int, time_taken: int):
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
    if time_taken > 20 * 1000:  # 20 seconds in milliseconds
        return {"success": False, "reason": "Challenge timed out."}

    # If everything is good:
    return {"success": True, "reason": "Verification successful."}