import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { type CarFormData, carSchema } from '@/shared/lib';

// Пример компонента с формой
const CarFormExample = () => {
  const form = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    mode: 'onChange',
    defaultValues: {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: 0,
      price: 0,
      color: '',
      fuelType: 'petrol',
      transmission: 'manual',
      engineVolume: 1.6,
      power: 100,
      bodyType: 'sedan',
      driveType: 'front',
      condition: 'used',
      isAvailable: true,
    },
  });

  const onSubmit = (data: CarFormData) => {
    console.log('Form data:', data);
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
              {...form.register('brand')}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
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
              {...form.register('model')}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
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

// Пример компонента с React Query
const DataExample = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['example-data'],
    queryFn: async () => {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { message: 'Данные загружены успешно!' };
    },
  });

  if (isLoading) return <Text>Загрузка...</Text>;
  if (error) return <Text color="red.500">Ошибка: {error.message}</Text>;

  return <Text color="green.500">{data?.message}</Text>;
};

export const App = () => {
  return (
    <Box p={8}>
      <VStack align="start" gap={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Baz Car Admin - Тест библиотек
        </Text>

        <HStack gap={4}>
          <Button colorPalette="blue">Chakra UI</Button>
          <Button colorPalette="green">React Query</Button>
          <Button colorPalette="red" variant="outline">
            Zod + RHF
          </Button>
        </HStack>

        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            React Query тест:
          </Text>
          <DataExample />
        </Box>

        <CarFormExample />

        <Text color="gray.600">Все библиотеки настроены и работают! 🚀</Text>
      </VStack>
    </Box>
  );
};
