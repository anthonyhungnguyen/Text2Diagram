from dotenv import load_dotenv
import os

load_dotenv()

cmd = [
    "gunicorn",
    "main:app",
    "--workers",
    "2",
    "--worker-class",
    "uvicorn.workers.UvicornWorker",
    "--bind",
    f"0.0.0.0:{os.getenv('PORT', '8000')}",
]

os.execvp(cmd[0], cmd)
