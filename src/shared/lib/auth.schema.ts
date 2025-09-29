import { z } from "zod";

// Схема для регистрации (для форм)
export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен для заполнения")
    .email("Некорректный формат email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  first_name: z.string().min(1, "Имя обязательно"),
  last_name: z.string().min(1, "Фамилия обязательна"),
});

// Схема для авторизации (для форм)
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен для заполнения")
    .email("Некорректный формат email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
