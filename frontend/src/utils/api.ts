const API_URL = import.meta.env.VITE_API_URL

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};