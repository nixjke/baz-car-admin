import { type LoginRequest, type RegisterRequest } from "../model/types";
import { type AuthResponse, type RefreshResponse } from "@/entities/user";

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
    const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
    (error as any).status = response.status;
    throw error;
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

// API функции для аутентификации
export const authApi = {
  // Регистрация
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Вход
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Обновление токена
  refresh: async (): Promise<RefreshResponse> => {
    return apiRequest<RefreshResponse>("/auth/refresh", {
      method: "POST",
    });
  },

  // Выход
  logout: async (token: string): Promise<void> => {
    await authenticatedRequest("/auth/logout", token, {
      method: "POST",
    });
  },
};
