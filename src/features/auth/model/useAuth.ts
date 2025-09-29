import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { userApi } from "@/entities/user";
import { type LoginRequest, type RegisterRequest } from "./types";
import { type AuthResponse } from "@/entities/user";

// Ключи для React Query
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};

// Хук для входа
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data: AuthResponse) => {
      // Сохраняем токен в localStorage для последующего использования
      localStorage.setItem("access_token", data.token);
      // Инвалидируем профиль пользователя
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
};

// Хук для регистрации
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data: AuthResponse) => {
      // Сохраняем токен в localStorage для последующего использования
      localStorage.setItem("access_token", data.token);
      // Инвалидируем профиль пользователя
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
};

// Хук для выхода
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        // Если токена нет, просто очищаем локальные данные
        return;
      }
      
      try {
        // Пытаемся отправить запрос на сервер
        await authApi.logout(token);
      } catch (error) {
        // Если запрос не удался (например, токен недействителен),
        // все равно очищаем локальные данные
        console.warn("Logout request failed, but clearing local data:", error);
      }
    },
    onSuccess: () => {
      // Очищаем токен и все кэшированные данные
      localStorage.removeItem("access_token");
      queryClient.clear();
    },
    onError: () => {
      // Даже если произошла ошибка, очищаем локальные данные
      localStorage.removeItem("access_token");
      queryClient.clear();
    },
  });
};

// Хук для обновления токена
export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.refresh(),
    onSuccess: (data) => {
      // Обновляем токен в localStorage
      localStorage.setItem("access_token", data.token);
      // Инвалидируем профиль пользователя
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
};

// Хук для получения профиля пользователя
export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No token found");
      
      try {
        return await userApi.getProfile(token);
      } catch (error: any) {
        // Если получили 401 ошибку, очищаем токен
        if (error?.status === 401) {
          localStorage.removeItem("access_token");
        }
        throw error;
      }
    },
    enabled: !!localStorage.getItem("access_token"),
    retry: false,
  });
};

// Функция для принудительного выхода (без запроса на сервер)
export const forceLogout = () => {
  localStorage.removeItem("access_token");
  // Перезагружаем страницу для полной очистки состояния
  window.location.href = "/";
};

// Хук для проверки аутентификации
export const useAuth = () => {
  const { data: user, isLoading, error } = useProfile();
  const logout = useLogout();
  const refreshToken = useRefreshToken();

  const isAuthenticated = !!user && !error;

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: logout.mutate,
    refreshToken: refreshToken.mutate,
    forceLogout,
  };
};
