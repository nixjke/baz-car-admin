import { Checkbox } from "@chakra-ui/checkbox";
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/form-control";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { type UserFormData, userSchema } from "@/shared/lib";

export const RegistrationPage = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "viewer",
      isActive: true,
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });


  const isActiveValue = watch("isActive");

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      console.log("Данные регистрации:", data);
      reset();

      toast({
        title: "Регистрация успешна!",
        description: "Пользователь успешно зарегистрирован в системе",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
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
                Полное имя *
              </Text>
              <Input
                type="text"
                placeholder="Введите ваше имя"
                size="lg"
                color="black"
                {...register("name")}
                borderColor={errors.name ? "red.300" : "gray.300"}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
              {errors.name && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.name.message}
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

            <Box width="100%">
              <Text fontWeight="bold" color="gray.700" mb={2}>
                Подтверждение пароля *
              </Text>
              <Input
                type="password"
                placeholder="Повторите пароль"
                size="lg"
                color="black"
                {...register("confirmPassword")}
                borderColor={errors.confirmPassword ? "red.300" : "gray.300"}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
              {errors.confirmPassword && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </Box>

            <VStack gap={4} width="100%" align="start">
              <FormControl isInvalid={!!errors.agreeToTerms}>
                <Flex align="center">
                  <Checkbox
                    id="agreeToTerms"
                    {...register("agreeToTerms")}
                    color="black"
                    borderColor="gray.400"
                    borderWidth="2px"
                    borderRadius="md"
                    borderStyle="solid"
                    w={24}
                    h={24}
                  />
                  <FormLabel
                    htmlFor="agreeToTerms"
                    mb={0}
                    ml={3}
                    cursor="pointer"
                    color="black"
                  >
                    Принимаю пользовательские условия
                  </FormLabel>
                </Flex>
              </FormControl>
            </VStack>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              loading={isSubmitting}
              loadingText="Регистрация..."
              width="full"
              mt={4}
            >
              Зарегистрировать
            </Button>
          </VStack>
          {!isActiveValue && (
            <Text fontSize="sm">Пользователь заблокирован</Text>
          )}
        </form>
      </Box>
    </Container>
  );
};
