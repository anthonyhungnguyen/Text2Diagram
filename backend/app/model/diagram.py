from pydantic import BaseModel


class DiagramRequest(BaseModel):
    text: str
    diagram_type: str = "sequence"  # sequence, class, etc.


class DiagramResponse(BaseModel):
    diagram_code: str
    diagram_type: str
