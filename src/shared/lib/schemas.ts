import { z } from "zod";

// Схема для автомобиля
export const carSchema = z.object({
  id: z.string().optional(),
  brand: z.string().min(1, "Марка обязательна"),
  model: z.string().min(1, "Модель обязательна"),
  year: z
    .number()
    .min(1900, "Год должен быть больше 1900")
    .max(new Date().getFullYear() + 1, "Год не может быть в будущем"),
  mileage: z.number().min(0, "Пробег не может быть отрицательным"),
  price: z.number().min(0, "Цена не может быть отрицательной"),
  color: z.string().min(1, "Цвет обязателен"),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"]),
  transmission: z.enum(["manual", "automatic"]),
  engineVolume: z.number().min(0.1, "Объем двигателя должен быть больше 0.1"),
  power: z.number().min(1, "Мощность должна быть больше 1"),
  bodyType: z.enum([
    "sedan",
    "hatchback",
    "suv",
    "coupe",
    "convertible",
    "wagon",
  ]),
  driveType: z.enum(["front", "rear", "all"]),
  condition: z.enum(["new", "used", "damaged"]),
  description: z.string().optional(),
  images: z.array(z.string().url("Некорректный URL изображения")).optional(),
  isAvailable: z.boolean(),
});

// Схема для фильтров автомобилей
export const carFiltersSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  yearFrom: z.number().min(1900).optional(),
  yearTo: z
    .number()
    .max(new Date().getFullYear() + 1)
    .optional(),
  priceFrom: z.number().min(0).optional(),
  priceTo: z.number().min(0).optional(),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"]).optional(),
  transmission: z.enum(["manual", "automatic"]).optional(),
  bodyType: z
    .enum(["sedan", "hatchback", "suv", "coupe", "convertible", "wagon"])
    .optional(),
  condition: z.enum(["new", "used", "damaged"]).optional(),
  isAvailable: z.boolean(),
});


// Типы на основе схем
export type CarFormData = z.infer<typeof carSchema>;
export type CarFiltersData = z.infer<typeof carFiltersSchema>;

