# Text2Diagram

A web application that converts natural language text descriptions into diagrams using AI. Currently supports sequence diagrams, flow charts, and state diagrams using Mermaid.js syntax.

## Features

- Convert natural language descriptions into diagram code
- Supports multiple diagram types:
  - Sequence diagrams
  - Flow charts 
  - State diagrams
- Gallery of example diagrams
- Real-time diagram preview
- Clean, responsive UI

## Tech Stack

Frontend:
- React
- TypeScript
- Tailwind CSS
- Mermaid.js
- Vite

Backend:
- FastAPI
- Google's Generative AI
- Python 3.10+

Deployment:
- AWS EC2 for hosting
- AWS Route 53 for DNS management
- AWS Certificate Manager for SSL
- AWS Application Load Balancer

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Poetry (Python package manager)
- Google Cloud API key with Gemini API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anthonyhungnguyen/Text2Diagram
cd Text2Diagram
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
poetry install
```

### Running Locally

1. Start the backend server:
```bash
cd backend
poetry run uvicorn app.main:app --reload
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open http://localhost:5173 in your browser

### Production Deployment

1. The application is deployed on AWS EC2 instances:
```bash
# Frontend: http://text2diagram.com
# Backend API: http://api.text2diagram.com
```

2. Infrastructure is managed through:
- AWS Application Load Balancer for traffic distribution
- Route 53 for domain management
- Certificate Manager for SSL/TLS certificates

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
