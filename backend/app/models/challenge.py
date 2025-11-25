from pydantic import BaseModel
from typing import Any, Dict, Optional

class GeneratedChallenge(BaseModel):
    challengeId: str
    type: str   # "odd_one_out" OR "drag_drop"
    prompt: str
    data: Dict[str, Any]    # Flexible payload (images list OR coordinate data)
    timeout: int= 20