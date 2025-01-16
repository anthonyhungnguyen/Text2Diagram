import os

# Server socket
bind = f"0.0.0.0:{os.getenv('PORT', '8000')}"
workers = 2
worker_class = "uvicorn.workers.UvicornWorker"

# Logging
accesslog = "-"
errorlog = "-"

# Environment variables
raw_env = [
    "GEMINI_MODEL_NAME=gemini-exp-1206",
    "TEMPERATURE=1",
    "TOP_P=0.95",
    "TOP_K=64",
    "MAX_OUTPUT_TOKENS=8192"
]
