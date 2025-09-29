import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { type LoginFormData, loginSchema } from "@/shared/lib";
import { useLogin } from "@/features/auth";
import { useNavigate, useLocation } from "react-router-dom";

export const LoginForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await loginMutation.mutateAsync(data);

      toast({
        title: "Вход выполнен!",
        description: "Вы успешно вошли в систему",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      reset();
      
      // Перенаправляем на страницу, с которой пришел пользователь, или на главную
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Ошибка входа:", error);
      toast({
        title: "Ошибка входа",
        description: "Неверный email или пароль",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Container maxW="md" py={8}>
      <Box borderWidth="1px" borderRadius="xl" boxShadow="xl" p={8} bg="white">
        <Heading as="h1" size="xl" textAlign="center" color="blue.600" mb={2}>
          Вход в систему
        </Heading>
        <Text textAlign="center" color="gray.600" mb={6}>
          Введите ваши учетные данные
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4}>
            <Box width="100%">
              <Text fontWeight="bold" color="gray.700" mb={2}>
                Email адрес *
              </Text>
              <Input
                type="email"
                placeholder="Введите ваш email"
                size="lg"
                color="black"
                {...register("email")}
                borderColor={errors.email ? "red.300" : "gray.300"}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.email.message}
                </Text>
              )}
            </Box>

            <Box width="100%">
              <Text fontWeight="bold" color="gray.700" mb={2}>
                Пароль *
              </Text>
              <Input
                type="password"
                placeholder="Введите ваш пароль"
                size="lg"
                color="black"
                {...register("password")}
                borderColor={errors.password ? "red.300" : "gray.300"}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
              {errors.password && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.password.message}
                </Text>
              )}
            </Box>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              loading={isSubmitting || loginMutation.isPending}
              loadingText="Вход..."
              width="full"
              mt={4}
            >
              Войти
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};
