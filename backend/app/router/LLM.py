from fastapi import APIRouter, HTTPException
from app.model.diagram import DiagramResponse
from app.service.LLM import LLM

router = APIRouter(
    prefix="/api",
    tags=["LLM"],
    responses={404: {"description": "Not found"}},
)

llm = LLM()


@router.get("/generate", response_model=DiagramResponse)
async def generate_diagram(prompt: str):
    try:
        response = llm.generate_diagram(prompt)
        return DiagramResponse(
            diagram=response,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
