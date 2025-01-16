from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import LLM

app = FastAPI(
    title="Text2Diagram API",
    description="API for converting text descriptions to diagrams",
    version="1.0.0",
)

# Configure CORS
origins = [
    "http://localhost:3000",  # React default port
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "https://text2diagram.anthonyhungnguyen.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)

# Include routers
app.include_router(LLM.router)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Text2Diagram API is running"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
