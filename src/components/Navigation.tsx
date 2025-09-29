import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth";

export const Navigation = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Не ждем завершения запроса, сразу перенаправляем
    navigate("/");
  };

  return (
    <Box borderBottom="1px" borderColor="gray.200" px={4} py={3}>
      <Flex justify="space-between" align="center">
        <Flex gap={4}>
          <Button
            onClick={() => navigate("/catalog-cars")}
            colorScheme="blue"
            variant="outline"
            size="md"
            color="white"
            _hover={{ color: "blue.600" }}
          >
            Каталог
          </Button>
        </Flex>

        <Flex gap={4} align="center">
          {isAuthenticated ? (
            <>
              <Text color="white" fontSize="sm">
                Привет, {user?.first_name || 'Пользователь'}!
              </Text>
              <Button
                onClick={handleLogout}
                colorScheme="red"
                variant="outline"
                size="md"
                color="white"
                _hover={{ color: "red.600" }}
              >
                Выход
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
