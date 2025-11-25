import uuid
import random
import json
import math
import os
from datetime import datetime
from pathlib import Path
from app.redis_client import redis_client

BASE_ASSETS = Path("app/assets/odd_one_out")
ANIMALS_PATH = BASE_ASSETS / "animals"

def get_all_assets_recursive(path):
    """Get all PNG files recursively from a path"""
    files = []
    for root, _, filenames in os.walk(path):
        for f in filenames:
            if f.endswith(".png"):
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, "app/assets")
                files.append(rel_path)
    return files

def generate_odd_one_out_challenge():
    # Get all subdirectories (categories)
    categories = {}
    
    if not BASE_ASSETS.exists():
        return None
    
    # Group images by category (subfolder)
    for category_dir in BASE_ASSETS.iterdir():
        if category_dir.is_dir():
            category_name = category_dir.name
            category_files = []
            
            for file in category_dir.glob("*.png"):
                rel_path = os.path.relpath(file, "app/assets")
                category_files.append(rel_path)
            
            if category_files:
                categories[category_name] = category_files
    
    # Need at least 2 categories with enough images
    if len(categories) < 2:
        return None
    
    # Pick two different categories
    category_names = list(categories.keys())
    normal_category, odd_category = random.sample(category_names, 2)
    
    # Get 5 normal images from one category
    normal_images = categories[normal_category]
    if len(normal_images) < 5:
        # If not enough images, use what we have
        selected_normals = normal_images
    else:
        selected_normals = random.sample(normal_images, 5)
    
    # Get 1 odd image from different category
    odd_images = categories[odd_category]
    odd_image = random.choice(odd_images)
    
    # Combine and shuffle
    all_images = selected_normals + [odd_image]
    random.shuffle(all_images)
    
    odd_index = all_images.index(odd_image)
    challenge_id = str(uuid.uuid4())
    

    payload = {
        "challengeId": challenge_id,
        "type": "odd_one_out",
        "prompt": "Tap the item that does NOT belong.",
        "data": {
            "images": [f"http://127.0.0.1:8000/assets/{img}" for img in all_images]
        },
        "timeout": 20
    }

    # Store answer
    redis_data = {"answer": odd_index, "type": "odd_one_out"}
    redis_client.setex(challenge_id, 120, json.dumps(redis_data))
    
    return payload
    
def generate_drag_drop_challenge():
    # Get a random image to use as the draggable item
    all_files = []
    if BASE_ASSETS.exists():
        for root, dirs, files in os.walk(BASE_ASSETS):
            for file in files:
                if file.endswith(".png"):
                    rel_path = os.path.relpath(os.path.join(root, file), "app/assets")
                    all_files.append(rel_path)
    
    target_image = random.choice(all_files) if all_files else "odd_one_out/animals/cat.png"

    challenge_id = str(uuid.uuid4())
    
    # Generate a target zone (assuming a 300x200px container on frontend)
    # We leave some padding so the target isn't on the extreme edge
    target_x = random.randint(50, 250)
    target_y = random.randint(50, 150)
    tolerance = 10  # pixels radius allowed

    payload = {
        "challengeId": challenge_id,
        "type": "drag_drop",
        "prompt" :"Drag the item into the circle.",
        "data": {
            "image" : f"http://127.0.0.1:8000/assets/{target_image}",
            "target_x": target_x,
            "target_y": target_y,
            "container_width": 300,
            "container_height": 200,
        },
        "timeout": 20
    }
    
    # Store coordinates
    redis_data = {
        "answer": {"x": target_x, "y": target_y, "tolerance": tolerance},
        "type": "drag_drop"
    }
    redis_client.setex(challenge_id, 120, json.dumps(redis_data))

    return payload

def generate_rotate_challenge():
    # Generate rotate challenge - only uses animals with clear orientation
    # Prefer animals folder
    files = get_all_assets_recursive(ANIMALS_PATH)
    if not files:
        # Fallback to all assets
        files = get_all_assets_recursive(BASE_ASSETS)
    
    if not files:
        return None
    
    target_image = random.choice(files)
    challenge_id = str(uuid.uuid4())

    # Random start angle (30-330 degrees)
    start_angle = random.randint(30, 330)

    payload = {
        "challengeId": challenge_id,
        "type": "rotate",
        "prompt": "Rotate the animal to be upright.",
        "data": {
            "image": f"http://127.0.0.1:8000/assets/{target_image}",
            "start_angle": start_angle
        },
        "timeout": 20
    }

    # Correct answer is 0 degrees (upright) with ±20 degree tolerance
    redis_data = {
        "answer": 0,
        "tolerance": 20,
        "type": "rotate"
    }
    redis_client.setex(challenge_id, 120, json.dumps(redis_data))
    
    return payload

def verify_challenge(challenge_id: str, user_answer: int, time_taken: int):
    # Fetch challenge data from Redis
    data = redis_client.get(challenge_id)

    if not data:
        return {"success": False, "reason": "Challenge expired or invalid."}

    stored_data = json.loads(data)

    # Delete challenge immediately (one-time use)
    redis_client.delete(challenge_id)

    challenge_type = stored_data.get("type", "odd_one_out")
    correct_answer = stored_data["answer"]

    # 1. Speed Check
    if time_taken < 800:
        return {"success": False, "reason": "Too fast. Bot detected."}

    # 2. Logic Check
    if challenge_type == "odd_one_out":
        if user_answer != correct_answer:
            return {"success": False, "reason": "Incorrect Selection."}
    
    elif challenge_type == "drag_drop":
        # Check coordinates distance
        if not isinstance(user_answer, dict):
            return {"success": False, "reason": "Invalid answer format."}
        
        user_x = user_answer.get("x", 0)
        user_y = user_answer.get("y", 0)
        target_x = correct_answer["x"]
        target_y = correct_answer["y"]
        tolerance = correct_answer["tolerance"]

        distance = math.sqrt((user_x - target_x) ** 2 + (user_y - target_y) ** 2)

        if distance > tolerance:
            return {"success": False, "reason": f"Missed target by {int(distance - tolerance)}px."}
     
    elif challenge_type == "rotate":
        # Handle circular angle difference (360° = 0°)
        diff = abs(user_answer - correct_answer)
        diff = min(diff, 360 - diff)  # e.g., 350° is only 10° away from 0°
        
        tolerance = stored_data.get("tolerance", 20)
        if diff > tolerance:
            return {"success": False, "reason": f"Not upright (off by {int(diff)}°)."}
        
    # GENERATE TOKEN (Simulated JWT)
    mock_token = f"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.{uuid.uuid4()}.{time_taken}"
        
    return {"success": True,
            "reason": "Verification successful.",
            "token": mock_token,
            "verified_at": str(datetime.now())
    }