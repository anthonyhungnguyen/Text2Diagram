import os


cmd = [
    "gunicorn",
    "main:app",
    "--workers",
    "2",
    "--worker-class",
    "uvicorn.workers.UvicornWorker",
    "--bind",
    f"0.0.0.0:{os.getenv('PORT', '8000')}",
    "--env",
    "GEMINI_MODEL_NAME=gemini-exp-1206",
    "--env",
    "TEMPERATURE=1",
    "--env",
    "TOP_P=0.95",
    "--env",
    "TOP_K=64",
    "--env",
    "MAX_OUTPUT_TOKENS=8192",
]

os.execvp(cmd[0], cmd)
