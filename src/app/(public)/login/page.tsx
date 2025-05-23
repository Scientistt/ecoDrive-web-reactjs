"use client";

import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    Field,
    useBreakpointValue,
    Spacer,
    Checkbox,
    Link
} from "@chakra-ui/react";

// import * as React from "react";
import { useState, useRef } from "react";

import { EcoDriveLogo, toaster, PasswordInput } from "components";
import { USER_JWT_TOKEN_NAME, isUsernameValid, setStorage } from "utils";
import { bgImages } from "assets";
import { login } from "endpoints";
import { useRouter } from "next/navigation";
import { useAuthContext } from "contexts";

export default function Login() {
    const [isLogInButtonActive, setIsLogInButtonActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFailed, setIsLoadingFailed] = useState(false);
    const [loginPassword, setLoginPassword] = useState<string>();
    const [isLoginPasswordValid, setIsLoginPasswordValid] = useState<boolean>(true);
    const [loginUserName, setLoginUserName] = useState<string>();
    const [isLoginUserNameValid, setIsLoginUserNameValid] = useState<boolean>(true);

    const [loginKeep, setLoginKeep] = useState<boolean>(true);

    const router = useRouter();

    const passwordInput = useRef<HTMLInputElement>(null);
    const loginInput = useRef<HTMLInputElement>(null);

    const { setUser } = useAuthContext();

    const handleLogin = async () => {
        try {
            if (!(isUsernameValid(loginUserName || "") && loginUserName?.trim() !== "")) {
                setIsLoginUserNameValid(false);
                return;
            }

            if ((loginPassword || "").trim().length < 8) {
                setIsLoginPasswordValid(false);
                return;
            }

            if (isLoginUserNameValid && isLoginPasswordValid) {
                setIsLoading(true);
                setIsLoadingFailed(false);

                const response = await login(loginUserName || "", loginPassword || "");

                if (response?.token) {
                    setStorage(USER_JWT_TOKEN_NAME, `Bearer ${response?.token.jwt_token}`);
                    setIsLogInButtonActive(false);
                    toaster.create({
                        type: "success",
                        title: "Log In com sucesso",
                        description: "redirecion"
                    });
                    setUser(response.user);
                    router.push("/suppliers");
                } else {
                    setIsLoadingFailed(true);
                    focusOnPasswordInput();
                }
            }
        } catch {
            focusOnPasswordInput();
            setIsLoadingFailed(true);
        } finally {
            setIsLoading(false);
        }
    };

    const focusOnPasswordInput = () => {
        setLoginPassword("");
        passwordInput.current?.focus();
    };

    const enterOnPassInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    const enterOnLoginInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            focusOnPasswordInput();
        }
    };

    const clickRegister = () => {
        router.push("/register");
    };
    const clickForgetPassword = () => {
        toaster.create({
            type: "info",
            title: "Funcionalidade não disponível",
            description:
                "Estamos trabalhando para que seja possível recuperar a senha em breve, por hora: Fale com o suporte"
        });
    };

    return (
        <Flex
            margin="auto"
            alignSelf="center"
            h={"calc(100vh - 50px)"}
            w="100%"
            flexDirection={{ base: "column", md: "row" }}
        >
            {/* --- Left side of page --- */}

            <Stack
                alignItems="center"
                justifyContent="center"
                w={{ base: "100vw", md: "50vw" }}
                p={{ base: "25px", md: "0px" }}
            >
                <HStack
                    display={{ base: "block", md: "none" }}
                    mb={{ base: "100px", md: "0px" }}
                    m={{ base: "50px", md: "0px" }}
                    align="center"
                    w="100%"
                >
                    <EcoDriveLogo size="big" />
                </HStack>

                <Stack w="450px" h="auto" p="10">
                    <Stack gap={8}>
                        <Stack gap={{ base: "2", md: "3" }} textAlign="center">
                            <Heading
                                textAlign="left"
                                ml={"-2px"}
                                fontWeight={"bold"}
                                fontSize={useBreakpointValue({ base: "40px", md: "50px" })}
                            >
                                Log in
                            </Heading>
                        </Stack>
                        <Box borderWidth="0px">
                            <Stack gap="6">
                                <Stack gap="5">
                                    <Field.Root required invalid={!isLoginUserNameValid}>
                                        <Field.Label htmlFor="login" fontSize={"lg"}>
                                            Usuário
                                        </Field.Label>
                                        <Input
                                            w="100%"
                                            ref={loginInput}
                                            required={true}
                                            id="login"
                                            colorPalette={"green"}
                                            px="10px"
                                            type="text"
                                            fontSize={"md"}
                                            onKeyDown={enterOnLoginInput}
                                            borderBottomWidth="2px"
                                            placeholder="Digite o seu nome de usuário"
                                            variant="flushed"
                                            onChange={(event) => {
                                                const newValue = event.target.value.toLowerCase().replace(/\s/g, "");
                                                setLoginUserName(newValue);
                                                setIsLoginUserNameValid(isUsernameValid(newValue));
                                            }}
                                        />
                                        {(loginUserName || "").trim() === "" ? (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                Usuário não pode ser vazio
                                            </Field.ErrorText>
                                        ) : (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                Usuário inválido
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>
                                    <Field.Root required invalid={isLoadingFailed || !isLoginPasswordValid}>
                                        <HStack w="100%" justifyContent="space-between">
                                            <Field.Label htmlFor="password" mt="4" fontSize={"lg"}>
                                                Senha
                                            </Field.Label>
                                            <Spacer />

                                            <Text color="muted" fontSize={"md"}>
                                                <Link
                                                    color={"green"}
                                                    onClick={clickForgetPassword}
                                                    fontWeight={"medium"}
                                                    variant="plain"
                                                >
                                                    Esqueceu a senha?
                                                </Link>
                                            </Text>
                                        </HStack>

                                        <PasswordInput
                                            w="100%"
                                            ref={passwordInput}
                                            required={true}
                                            colorPalette={"green"}
                                            px="10px"
                                            fontSize={"md"}
                                            id="password"
                                            type="password"
                                            onKeyDown={enterOnPassInput}
                                            borderBottomWidth="2px"
                                            placeholder="Digite a sua senha"
                                            variant="flushed"
                                            onChange={(event) => {
                                                setLoginPassword(event.target.value);
                                                const newValue = event.target.value;
                                                setLoginPassword(newValue);
                                                setIsLoginPasswordValid(newValue?.length >= 8);
                                            }}
                                        />

                                        {isLoginPasswordValid ? (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                Usuário e/ou Senha inválido(s)
                                            </Field.ErrorText>
                                        ) : (loginPassword || "").trim() === "" ? (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                Informe a sua senha
                                            </Field.ErrorText>
                                        ) : (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                A senha deve conter pelo menos 8 dígitos
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>
                                </Stack>
                                <Checkbox.Root
                                    variant={"solid"}
                                    colorPalette={"green"}
                                    value={"Keep"}
                                    checked={loginKeep}
                                    onCheckedChange={(e) => setLoginKeep(!!e.checked)}
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label fontSize={"md"}>Salvar sessão</Checkbox.Label>
                                </Checkbox.Root>
                                <Stack gap="6">
                                    <Button
                                        variant="solid"
                                        color="dark"
                                        fontSize={"lg"}
                                        size={"lg"}
                                        type="submit"
                                        bgColor={{ base: "green.700", _dark: "green.500" }}
                                        borderLeftRadius="0"
                                        borderBottomLeftRadius="55"
                                        borderRightRadius="50"
                                        loading={isLoading}
                                        onClick={handleLogin}
                                        disabled={!isLogInButtonActive}
                                    >
                                        Log In
                                    </Button>
                                    <HStack gap={1} justify="center">
                                        <Text color="muted" fontSize={"md"}>
                                            Novo por aqui?{" "}
                                            <Link
                                                color={"green"}
                                                onClick={clickRegister}
                                                fontWeight={"medium"}
                                                variant="plain"
                                            >
                                                Registre-se
                                            </Link>
                                        </Text>
                                    </HStack>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>

            {/* Right: Login Illustration */}
            <Stack
                // bg="red"
                bgImage={`url(${bgImages.login.src})`}
                bgSize={"cover"}
                bgRepeat={"no-repeat"}
                bgPos={"center"}
                bgColor={"green.600"}
                alignItems="center"
                justifyContent="center"
                w={{ base: "100vw", md: "50vw" }}
                minH={{ base: "50vw", md: "00vw" }}
                p={{ base: "25px", md: "0px" }}
                mt={{ base: "25px", md: "0px" }}
            >
                {/* <Image
                    src={"favicon.ico"}
                    alt="algo aqui"
                    w={{ base: "95vw", sm: "60%" }}
                    // display={{ base: "none", sm: "block" }}
                /> */}
            </Stack>
        </Flex>
    );
}
