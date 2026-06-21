const API_URL = 'http://localhost:3001/api';

export const apiClient = {
  async get(endpoint: string) {
    const token = localStorage.getItem('lifelink_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, { headers });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  },

  async post(endpoint: string, data: any) {
    const token = localStorage.getItem('lifelink_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }
    return res.json();
  }
};
