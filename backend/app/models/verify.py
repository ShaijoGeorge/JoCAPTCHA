from pydantic import BaseModel
from typing import Any, Dict, Union


class VerifyRequest(BaseModel):
    challengeId: str
    answer: Union[int, Dict[str, Any]]  # Can be index (int) OR coordinates (dict)
    timeTaken: int  # in milliseconds