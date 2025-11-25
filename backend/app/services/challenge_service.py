import uuid
import random
import json
import math
import os
from pathlib import Path
from app.redis_client import redis_client

ASSETS_PATH = Path("app/assets/odd_one_out")

def generate_odd_one_out_challenge():
    # Helper to get all PNG files
    all_files = []
    # Ensure directory exists to avoid errors if empty
    if ASSETS_PATH.exists():
        for root, dirs, files in os.walk(ASSETS_PATH):
            for file in files:
                if file.endswith(".png"):
                    # Create a relative path usable by the frontend
                    # Assume the file is unique enough or just pick one
                    rel_path = os.path.relpath(os.path.join(root, file), "app/assets")
                    all_files.append(rel_path)
    if not all_files:
        # Fallback if folder is empty
        return None

    odd = random.choice(all_files)
    # Ideally pick normals from a similar folder, but for now random
    # Filter out the odd image to avoid duplicates
    potential_normals = [f for f in all_files if f != odd]
    
    if len(potential_normals) < 4:
        normals = potential_normals
    else:
        normals = random.sample(potential_normals, 4)
    
    images = [odd] + normals
    random.shuffle(images)
    
    odd_index = images.index(odd)
    challenge_id = str(uuid.uuid4())
    

    payload = {
        "challengeId": challenge_id,
        "type": "odd_one_out",
        "prompt": "Tap the item that does NOT belong.",
        "data": {
            "images": [f"http://127.0.0.1:8000/assets/{img}" for img in images]
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
    if ASSETS_PATH.exists():
        for root, dirs, files in os.walk(ASSETS_PATH):
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
        
    return {"success": True, "reason": "Verification successful."}