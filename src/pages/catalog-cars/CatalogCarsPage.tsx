import { Box, Heading, Text } from "@chakra-ui/react";

export const CatalogCarsPage = () => {
  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={4}>
        Каталог автомобилей
      </Heading>
      <Text>
        Добро пожаловать в защищенную область каталога автомобилей!
      </Text>
    </Box>
  );
};
