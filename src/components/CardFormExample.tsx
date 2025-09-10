import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type CarFormData, carSchema } from "@/shared/lib";

// Пример компонента с формой
export const CarFormExample = () => {
  const form = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    mode: "onChange",
    defaultValues: {
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      mileage: 0,
      price: 0,
      color: "",
      fuelType: "petrol",
      transmission: "manual",
      engineVolume: 1.6,
      power: 100,
      bodyType: "sedan",
      driveType: "front",
      condition: "used",
      isAvailable: true,
    },
  });

  const onSubmit = (data: CarFormData) => {
    console.log("Form data:", data);
  };

  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Пример формы с валидацией
      </Text>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <Box>
            <Text mb={1}>Марка:</Text>
            <input
              {...form.register("brand")}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {form.formState.errors.brand && (
              <Text color="red.500" fontSize="sm">
                {form.formState.errors.brand.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={1}>Модель:</Text>
            <input
              {...form.register("model")}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {form.formState.errors.model && (
              <Text color="red.500" fontSize="sm">
                {form.formState.errors.model.message}
              </Text>
            )}
          </Box>

          <Button type="submit" colorPalette="blue">
            Отправить форму
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
