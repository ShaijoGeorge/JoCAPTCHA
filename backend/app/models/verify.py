from pydantic import BaseModel

class VerifyRequest(BaseModel):
    challengeId: str
    answer: int
    timeTaken: int  # in milliseconds