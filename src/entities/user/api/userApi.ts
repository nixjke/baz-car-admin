import { type User, type AuthResponse, type RefreshResponse } from "../model/types";

const API_BASE_URL = "/api";

// Функция для выполнения HTTP запросов
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Для работы с HttpOnly cookies
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Функция для авторизованных запросов
async function authenticatedRequest<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}

// API функции для пользователя
export const userApi = {
  // Получение профиля пользователя
  getProfile: async (token: string): Promise<User> => {
    return authenticatedRequest<User>("/auth/profile", token, {
      method: "GET",
    });
  },
};
