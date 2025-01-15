from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import LLM

app = FastAPI(
    title="Text2Diagram API",
    description="API for converting text descriptions to diagrams",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(LLM.router)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Text2Diagram API is running"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
