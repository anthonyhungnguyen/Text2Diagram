from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.model.diagram import DiagramRequest, DiagramResponse
from app.service.LLM import LLM

router = APIRouter(
    prefix="/api/llm",
    tags=["LLM"],
    responses={404: {"description": "Not found"}},
)

llm = LLM()


@router.post("/generate", response_model=DiagramResponse)
async def generate_diagram(request: DiagramRequest):
    try:
        response = llm.generate_diagram(request.prompt)
        return DiagramResponse(
            diagram_code=response,
            diagram_type=request.diagram_type,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
