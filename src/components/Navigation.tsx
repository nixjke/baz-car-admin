import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Box borderBottom="1px" borderColor="gray.200" px={4} py={3}>
      <Flex justify="center" gap={4}>
        <Button
          onClick={() => navigate("/")}
          colorScheme="blue"
          variant="outline"
          size="md"
          color="white"
          _hover={{ color: "blue.600" }}
        >
          Главная
        </Button>

        <Button
          onClick={() => navigate("/login")}
          colorScheme="blue"
          variant="outline"
          size="md"
          color="white"
          _hover={{ color: "blue.600" }}
        >
          Вход
        </Button>

        <Button
          onClick={() => navigate("/register")}
          colorScheme="blue"
          variant="outline"
          size="md"
          color="white"
          _hover={{ color: "blue.600" }}
        >
          Регистрация
        </Button>
      </Flex>
    </Box>
  );
};
