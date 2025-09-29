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

import { type RegisterFormData, registerSchema } from "@/shared/lib";
import { useRegister } from "@/features/auth";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const registerMutation = useRegister();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      reset();

      toast({
        title: "Регистрация успешна!",
        description: "Пользователь успешно зарегистрирован в системе",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      // Перенаправляем на главную страницу
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      toast({
        title: "Ошибка регистрации",
        description: "Произошла ошибка при регистрации пользователя",
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
          Регистрация
        </Heading>
        <Text textAlign="center" color="gray.600" mb={6}>
          Заполните форму для создания аккаунта
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
                Имя *
              </Text>
              <Input
                type="text"
                placeholder="Введите ваше имя"
                size="lg"
                color="black"
                {...register("first_name")}
                borderColor={errors.first_name ? "red.300" : "gray.300"}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
              {errors.first_name && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.first_name.message}
                </Text>
              )}
            </Box>

            <Box width="100%">
              <Text fontWeight="bold" color="gray.700" mb={2}>
                Фамилия *
              </Text>
              <Input
                type="text"
                placeholder="Введите вашу фамилию"
                size="lg"
                color="black"
                {...register("last_name")}
                borderColor={errors.last_name ? "red.300" : "gray.300"}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
              {errors.last_name && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.last_name.message}
                </Text>
              )}
            </Box>

            <Box width="100%">
              <Text fontWeight="bold" color="gray.700" mb={2}>
                Пароль *
              </Text>
              <Input
                type="password"
                placeholder="Придумайте пароль"
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
              loading={isSubmitting || registerMutation.isPending}
              loadingText="Регистрация..."
              width="full"
              mt={4}
            >
              Зарегистрировать
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};
