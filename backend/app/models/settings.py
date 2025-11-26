from pydantic import BaseModel
from typing import List

class CaptchaSettings(BaseModel):
    difficulty: int = 50    # 0 to 100
    enabled_types: List[str] = ["odd_one_out", "drag_drop", "rotate"]