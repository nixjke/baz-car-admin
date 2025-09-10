import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export const DataExample = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["example-data"],
    queryFn: async () => {
      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { message: "Данные загружены успешно!" };
    },
  });

  if (isLoading) return <Text>Загрузка...</Text>;
  if (error) return <Text color="red.500">Ошибка: {error.message}</Text>;

  return <Text color="green.500">{data?.message}</Text>;
};
