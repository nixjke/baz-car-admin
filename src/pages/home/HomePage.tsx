import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";

import { CarFormExample, DataExample } from "@/components";

export const HomePage = () => {
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
