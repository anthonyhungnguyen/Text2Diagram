import os
from dotenv import load_dotenv
import google.generativeai as genai
import logging
import re

load_dotenv()  # Still load other configs from .env


class LLM:
    def __init__(self):
        # Set up logger
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

        self.logger.info("Initializing LLM service")
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

        self.logger.debug("Creating model with config: %s", generation_config)
        self.model = genai.GenerativeModel(
            model_name=os.getenv("GEMINI_MODEL_NAME"),
            generation_config=generation_config,
        )
        self.logger.info("LLM service initialized successfully")

    def _prepare_prompt(self, instruction: str):
        return f"Generate a diagram for the following instruction: {instruction}. Output must be mermaid js compatible."

    def _extract_mermaid_code(self, text: str) -> str:
        """Extract mermaid code from text, handling different formats."""
        # Try to find code between ```mermaid and ``` markers
        mermaid_pattern = r"```mermaid\n([\s\S]*?)```"
        if match := re.search(mermaid_pattern, text):
            return match.group(1).strip()

        # Try to find any code between ``` markers
        code_pattern = r"```\n?([\s\S]*?)```"
        if match := re.search(code_pattern, text):
            return match.group(1).strip()

        # If no markers found, assume the entire text is the diagram code
        # but clean up any potential natural language
        lines = text.strip().split("\n")
        # Keep only lines that look like Mermaid syntax
        mermaid_lines = [
            line
            for line in lines
            if line.strip()
            and not line.lower().startswith(("here", "this", "the", "above"))
        ]
        return "\n".join(mermaid_lines)

    def generate_diagram(self, instruction: str):
        try:
            self.logger.info("Generating diagram for instruction: %s", instruction)
            prompt = self._prepare_prompt(instruction)
            response = self.model.generate_content(prompt)
            raw_text = response.text

            self.logger.debug("Raw response: %s", raw_text)
            diagram_code = self._extract_mermaid_code(raw_text)
            self.logger.debug("Extracted diagram code: %s", diagram_code)

            return diagram_code
        except Exception as e:
            self.logger.error("Error generating diagram: %s", str(e))
            raise
