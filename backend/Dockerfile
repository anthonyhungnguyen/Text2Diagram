FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=1.6.1 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PORT=8000

# Install system dependencies and Poetry
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc curl \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && ln -s /opt/poetry/bin/poetry /usr/local/bin/poetry \
    && rm -rf /var/lib/apt/lists/*

# Copy Poetry files
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry add python-dotenv && poetry install --no-root --no-dev

# Copy application code
COPY . .

# Expose port
EXPOSE $PORT

# Change the CMD to use gunicorn with config
CMD ["poetry", "run", "gunicorn", "-c", "gunicorn_config.py", "main:app"]
