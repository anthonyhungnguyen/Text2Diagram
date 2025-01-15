from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.model.diagram import DiagramRequest, DiagramResponse

router = APIRouter(
    prefix="/api/llm",
    tags=["LLM"],
    responses={404: {"description": "Not found"}},
)


@router.post("/generate", response_model=DiagramResponse)
async def generate_diagram(request: DiagramRequest):
    try:
        # TODO: Implement actual LLM logic here
        # This is just a placeholder response
        return DiagramResponse(
            diagram_code="participant A\nparticipant B\nA->B: Hello",
            diagram_type=request.diagram_type,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
