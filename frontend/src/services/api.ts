import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface DiagramResponse {
  diagram_code: string;
  diagram_type: string;
}

export const generateDiagram = async (prompt: string): Promise<string> => {
  try {
    const { data } = await api.post<DiagramResponse>('/api/llm/generate', { prompt });
    return data.diagram_code;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to generate diagram');
    }
    throw error;
  }
};
