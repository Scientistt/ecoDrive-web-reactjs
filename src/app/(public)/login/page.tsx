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
    Image,
    Field,
    useBreakpointValue,
    Spacer,
    Checkbox,
    Link
} from "@chakra-ui/react";

// import * as React from "react";
import { useState, useRef } from "react";

import { EcoDriveLogo } from "components";
import { useColorMode } from "contexts";
import { USER_JWT_TOKEN_NAME, setStorage } from "utils";
import { bgImages } from "assets";
import { login } from "endpoints";
import { useRouter } from "next/navigation";

export default function Login() {
    const { colorMode } = useColorMode();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFailed, setIsLoadingFailed] = useState(false);
    const [loginPassword, setLoginPassword] = useState<string>();
    const [loginUserName, setLoginUserName] = useState<string>();
    const [loginKeep, setLoginKeep] = useState<boolean>(true);

    const router = useRouter();

    const passwordInput = useRef<HTMLInputElement>(null);
    const loginInput = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setIsLoadingFailed(false);

            const response = await login(loginUserName || "", loginPassword || "");

            if (response?.token) {
                setStorage(USER_JWT_TOKEN_NAME, `Bearer ${response?.token.jwt_token}`);
                router.push("/suppliers");
            } else {
                setIsLoadingFailed(true);
                focusOnPasswordInput();
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

    // const focusOnLoginInput = () => {
    //     loginInput.current?.focus();
    // };

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

    return (
        <Flex
            margin="auto"
            alignSelf="center"
            h={{ base: "auto", md: "100vh" }}
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

                <Stack w="450px" h="500px" p="10">
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
                                    <Field.Root>
                                        <Field.Label htmlFor="login" fontSize={"md"}>
                                            Usuário
                                        </Field.Label>
                                        <Input
                                            w="100%"
                                            ref={loginInput}
                                            required={true}
                                            id="login"
                                            type="text"
                                            onKeyDown={enterOnLoginInput}
                                            borderBottomWidth="2px"
                                            placeholder="Digite o seu nome de usuário"
                                            variant="flushed"
                                            value={loginUserName}
                                            onChange={(event) => {
                                                setLoginUserName(event.target.value.toLowerCase().replace(/\s/g, ""));
                                            }}
                                        />

                                        <HStack w="100%" justifyContent="space-between">
                                            <Field.Label htmlFor="password" mt="4" fontSize={"md"}>
                                                Senha
                                            </Field.Label>
                                            <Spacer />

                                            <Text color="muted" fontSize={"sm"}>
                                                <Link color={"green"} fontWeight={"medium"} variant="plain">
                                                    Esqueceu a senha?
                                                </Link>
                                            </Text>
                                        </HStack>

                                        <Input
                                            w="100%"
                                            ref={passwordInput}
                                            required={true}
                                            id="password"
                                            type="password"
                                            onKeyDown={enterOnPassInput}
                                            value={loginPassword}
                                            borderBottomWidth="2px"
                                            placeholder="Digite a sua senha"
                                            variant="flushed"
                                            onChange={(event) => {
                                                setLoginPassword(event.target.value);
                                            }}
                                        />
                                    </Field.Root>
                                    {isLoadingFailed ? (
                                        <Text color="red" fontSize={"sm"}>
                                            Usuário e/ou senha inválido(s)
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
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
                                        type="submit"
                                        bgColor={{ base: "green.700", _dark: "green.500" }}
                                        borderLeftRadius="0"
                                        borderBottomLeftRadius="55"
                                        borderRightRadius="50"
                                        loading={isLoading}
                                        onClick={handleLogin}
                                    >
                                        Log In
                                    </Button>
                                    <HStack gap={1} justify="center">
                                        <Text color="muted" fontSize={"md"}>
                                            Novo por aqui?{" "}
                                            <Link color={"green"} fontWeight={"medium"} variant="plain">
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
                bgImage={`url(${colorMode === "dark" ? bgImages.dev_dark.src : bgImages.dev.src})`}
                bgSize={"180%"}
                bgPos={"center"}
                bgColor={"green.600"}
                alignItems="center"
                justifyContent="center"
                w={{ base: "100%", md: "50%" }}
                p={{ base: "25px", md: "0px" }}
                mt={{ base: "25px", md: "0px" }}
            >
                <Image
                    src={"favicon.ico"}
                    alt="algo aqui"
                    w={{ base: "95vw", sm: "60%" }}
                    // display={{ base: "none", sm: "block" }}
                />
            </Stack>
        </Flex>
    );
}
