from pydantic import BaseModel


class DiagramRequest(BaseModel):
    prompt: str


class DiagramResponse(BaseModel):
    diagram: str
