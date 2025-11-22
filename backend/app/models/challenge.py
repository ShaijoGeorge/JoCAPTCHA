from pydantic import BaseModel
from typing import List

class GeneratedChallenge(BaseModel):
    challengeId: str
    type: str
    prompt: str
    images: List[str]
    timeout: int= 20