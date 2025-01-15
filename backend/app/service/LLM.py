import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()  # Still load other configs from .env

genai.configure(
    api_key=os.environ["GEMINI_API_KEY"]
)  # Get directly from OS environment

# Create the model
generation_config = {
    "temperature": float(os.getenv("TEMPERATURE")),
    "top_p": float(os.getenv("TOP_P")),
    "top_k": int(os.getenv("TOP_K")),
    "max_output_tokens": int(os.getenv("MAX_OUTPUT_TOKENS")),
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name=os.getenv("GEMINI_MODEL_NAME"),
    generation_config=generation_config,
)

chat_session = model.start_chat(history=[])

response = chat_session.send_message("INSERT_INPUT_HERE")

print(response.text)
