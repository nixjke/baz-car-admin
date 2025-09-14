import { z } from "zod";

// Схема для пользователя
export const userSchema = z
  .object({
    id: z.string().optional(),
    email: z.string().email("Некорректный email"),
    name: z.string().min(1, "Имя обязательно"),
    role: z.enum(["admin", "manager", "viewer"]),
    isActive: z.boolean(),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    agreeToTerms: z.boolean(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

// Схема для авторизации
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен для заполнения")
    .email("Некорректный формат email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export type UserFormData = z.infer<typeof userSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
