const API_URL = import.meta.env.VITE_API_URL;

/* eslint-disable no-undef */
export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!isFormData) {
    const method = options.method?.toUpperCase() || "GET";
    if (method !== "GET" && method !== "HEAD") {
      if (!("Content-Type" in headers)) {
        headers["Content-Type"] = "application/json";
      }
    }
  }

  return fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers,
  });
};
