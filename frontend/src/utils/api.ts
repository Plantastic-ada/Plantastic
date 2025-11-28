const API_URL = import.meta.env.VITE_API_URL;

/* eslint-disable no-undef */
export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const defaultHeaders: HeadersInit = {};

  const method = options.method?.toUpperCase() || "GET";
  if (method !== "GET" && method !== "HEAD") {
    // Add a Content-Type only if it's not defined
    if (!options.headers || !("Content-Type" in options.headers)) {
      defaultHeaders["Content-Type"] = "application/json";
    }
  }

  return fetch(`${API_URL}${endpoint}`, {
    credentials: "include", // includes cookies
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
};
