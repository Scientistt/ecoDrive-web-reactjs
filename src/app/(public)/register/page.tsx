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
    Link,
    Spinner,
    InputGroup
} from "@chakra-ui/react";

// import * as React from "react";
import { useState, useRef, RefObject } from "react";

import { EcoDriveLogo, PasswordInput } from "components";

import { toaster } from "components";
import { bgImages } from "assets";
import { validateRegisterVoucher, validateRegisterEmail, validateRegisterUserName, register } from "endpoints";
import { useRouter } from "next/navigation";
import { isEmailValid, isUsernameValid } from "utils";

import { LuCheck } from "react-icons/lu";

export default function Login() {
    // const [haSubmittedOnce, setHaSubmittedOnce] = useState(false);

    const [isRegisterButtonActive, setIsRegisterButtonActive] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const [registerPassword, setRegisterPassword] = useState<string>("");
    const [isRegisterPasswordValid, setIsRegisterPasswordValid] = useState<boolean>(true);

    const [registerPasswordDup, setRegisterPasswordDup] = useState<string>("");
    const [isRegisterPasswordDupValid, setIsRegisterPasswordDupValid] = useState<boolean>(false);
    const [isRegisterPasswordDupClicked, setIsRegisterPasswordDupClicked] = useState<boolean>(false);

    const [registerUserName, setRegisterUserName] = useState<string>("");
    const [isRegisterUserNameValid, setIsRegisterUserNameValid] = useState<boolean>(true);
    const [isRegisterUserNameValidated, setIsRegisterUserNameValidated] = useState<boolean>(false);
    const [isRegisterUserNameAvailable, setIsRegisterUserNameAvailable] = useState<boolean>(false);
    const [isRegisterUserNameLoading, setIsRegisterUserNameLoading] = useState<boolean>(false);
    const [registerUserNameTimeout, setRegisterUserNameTimeout] = useState<NodeJS.Timeout | null>(null);

    const [registerEmail, setRegisterEmail] = useState<string>("");
    const [isRegisterEmailValid, setIsRegisterEmailValid] = useState<boolean>(true);
    const [isRegisterEmailValidated, setIsRegisterEmailValidated] = useState<boolean>(false);
    const [isRegisterEmailLoading, setIsRegisterEmailLoading] = useState<boolean>(false);
    const [registerEmailTimeout, setRegisterEmailTimeout] = useState<NodeJS.Timeout | null>(null);

    const [registerName, setRegisterName] = useState<string>("");
    const [isRegisterNameValid, setIsRegisterNameValid] = useState<boolean>(true);

    const [registerVoucher, setRegisterVoucher] = useState<string>("");
    const [isRegisterVoucherValid, setIsRegisterVoucherValid] = useState<boolean>(true);
    const [isRegisterVoucherValidated, setIsRegisterVoucherValidated] = useState<boolean>(false);
    const [isRegisterVoucherLoading, setIsRegisterVoucherLoading] = useState<boolean>(false);
    const [registerVoucherTimeout, setRegisterVoucherTimeout] = useState<NodeJS.Timeout | null>(null);

    const router = useRouter();

    const passwordInput = useRef<HTMLInputElement>(null);
    const passwordDupInput = useRef<HTMLInputElement>(null);
    const userNameInput = useRef<HTMLInputElement>(null);
    const voucherInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);

    const validateVoucherValue = async (newValue: string) => {
        try {
            setIsRegisterVoucherLoading(true);
            const response = await validateRegisterVoucher(newValue);

            if (response) {
                setIsRegisterVoucherValid(true);
                setIsRegisterVoucherValidated(true);
            } else {
                setIsRegisterVoucherValid(false);
            }
        } catch {
            setIsRegisterVoucherValid(false);
        } finally {
            setIsRegisterVoucherLoading(false);
        }
    };

    const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRegisterVoucherValid(true);
        setIsRegisterVoucherValidated(false);
        e.target.value = e.target.value.toUpperCase().replace(/\s/g, "");
        const newValue = e.target.value;
        setRegisterVoucher(newValue);

        if (registerVoucherTimeout) clearTimeout(registerVoucherTimeout);

        const timeout = setTimeout(() => {
            if (newValue.length === 7) {
                validateVoucherValue(newValue);
            } else {
                setIsRegisterVoucherValid(false);
            }
        }, 1000);

        setRegisterVoucherTimeout(timeout);
    };

    const validateEmailValue = async (newValue: string) => {
        try {
            setIsRegisterEmailLoading(true);
            console.log("Validating Email: ", newValue);
            const response = await validateRegisterEmail(newValue);

            if (response) {
                setIsRegisterEmailValid(true);
                setIsRegisterEmailValidated(true);
            } else {
                setIsRegisterEmailValid(false);
            }
        } catch {
            setIsRegisterEmailValid(false);
        } finally {
            setIsRegisterEmailLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRegisterEmailValid(true);
        setIsRegisterEmailValidated(false);
        const newValue = e.target.value;
        setRegisterEmail(newValue);

        if (registerEmailTimeout) clearTimeout(registerEmailTimeout);

        const timeout = setTimeout(() => {
            if (isEmailValid(newValue)) validateEmailValue(newValue);
            else setIsRegisterEmailValid(false);
        }, 1000);

        setRegisterEmailTimeout(timeout);
    };

    const validateUserNameValue = async (newValue: string) => {
        try {
            setIsRegisterUserNameLoading(true);
            console.log("Validating UserName: ", newValue);
            const response = await validateRegisterUserName(newValue);

            if (response) {
                setIsRegisterUserNameValid(true);
                setIsRegisterUserNameValidated(true);
                setIsRegisterUserNameAvailable(true);
            } else {
                setIsRegisterUserNameValid(false);
            }
        } catch {
            setIsRegisterUserNameValid(false);
        } finally {
            setIsRegisterUserNameLoading(false);
        }
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRegisterUserNameValid(true);
        setIsRegisterUserNameValidated(false);
        setIsRegisterUserNameAvailable(false);
        e.target.value.toLowerCase().replace(/\s/g, "");
        const newValue = e.target.value;
        setRegisterUserName(newValue);

        console.log("Vamos validar UserName? ", newValue);

        if (registerUserNameTimeout) clearTimeout(registerUserNameTimeout);

        const timeout = setTimeout(() => {
            if (newValue.length >= 4 && isUsernameValid(newValue)) validateUserNameValue(newValue);
            else setIsRegisterUserNameValid(false);
        }, 1000);

        setRegisterUserNameTimeout(timeout);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setRegisterName(newValue);

        if (newValue.trim() === "") setIsRegisterNameValid(false);
        else setIsRegisterNameValid(true);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setRegisterPassword(newValue);

        if (newValue.length < 8) setIsRegisterPasswordValid(false);
        else {
            setIsRegisterPasswordValid(true);
            if (registerPasswordDup === newValue) setIsRegisterPasswordDupValid(true);
            else setIsRegisterPasswordDupValid(false);
        }
    };

    const handlePasswordDupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setRegisterPasswordDup(newValue);
        setIsRegisterPasswordDupClicked(true);

        if (newValue === registerPassword) setIsRegisterPasswordDupValid(true);
        else setIsRegisterPasswordDupValid(false);
    };

    // Register

    const handleRegister = async () => {
        try {
            if (
                isRegisterVoucherValid &&
                isRegisterNameValid &&
                isRegisterEmailValid &&
                isRegisterUserNameValid &&
                isRegisterPasswordValid &&
                isRegisterPasswordDupValid
            ) {
                setIsLoading(true);

                const response = await register(
                    registerVoucher,
                    registerName,
                    registerUserName,
                    registerPassword,
                    registerEmail
                );

                if (response?.header.http === 201) {
                    setIsRegisterButtonActive(false);
                    toaster.create({
                        type: "success",
                        title: "Conta criada com sucesso",
                        description: "Vamos direcioná-lo para a página de login"
                    });
                    router.push("/login");

                    // timeout
                } else {
                    // talvez nunca aconteça
                    toaster.create({
                        type: "error",
                        title: "Alguma coisa aconteceu",
                        description:
                            "Não foi possível concluir o seu registro. Verifique os dados informados e tente novamente."
                    });
                }

                console.log("Response: ", response);
            }

            // const response = await register(loginUserName || "", loginPassword || "");

            // if (response?.token) {
            //     setStorage(USER_JWT_TOKEN_NAME, `Bearer ${response?.token.jwt_token}`);
            //     router.push("/suppliers");
            // } else {
            //     setIsLoadingFailed(true);
            //     focusOnPasswordInput();
            // }
        } catch {
            toaster.create({
                type: "error",
                title: "Alguma coisa aconteceu",
                description:
                    "Não foi possível concluir o seu registro. Verifique os dados informados e tente novamente."
            });
        } finally {
            setIsLoading(false);
        }
    };

    // const focusOnNextField = () => {
    //     setLoginPassword("");
    //     passwordInput.current?.focus();
    // };

    // const focusOnPasswordInput = () => {
    //     setLoginPassword("");
    //     passwordInput.current?.focus();
    // };

    // const focusOnLoginInput = () => {
    //     loginInput.current?.focus();
    // };

    const onEnterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleRegister();
        }
    };

    const onEnterfocusOnNextField = (focusOn: RefObject<HTMLInputElement | null>) => {
        return (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                focusOn.current?.focus();
            }
        };
    };

    const clickLogin = () => {
        router.push("/login");
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

                <Stack w="550px" h="auto" p="10">
                    <Stack gap={8}>
                        <Stack gap={{ base: "2", md: "3" }} textAlign="center">
                            <Heading
                                textAlign="left"
                                ml={"-2px"}
                                fontWeight={"bold"}
                                fontSize={useBreakpointValue({ base: "40px", md: "50px" })}
                            >
                                Registre-se
                            </Heading>
                        </Stack>
                        <Box borderWidth="0px">
                            <Stack gap="6">
                                <Stack gap="5">
                                    <Field.Root required invalid={!isRegisterVoucherValid}>
                                        <Field.Label htmlFor="voucherInput" fontSize={"lg"} mt="4">
                                            Voucher
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup
                                            flex="1"
                                            endElement={
                                                isRegisterVoucherLoading ? (
                                                    <Spinner colorPalette={"green"} />
                                                ) : isRegisterVoucherValid && isRegisterVoucherValidated ? (
                                                    <>
                                                        <LuCheck color="green" size={"20px"} />
                                                    </>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        >
                                            <Input
                                                w="100%"
                                                ref={voucherInput}
                                                required={true}
                                                id="voucher"
                                                colorPalette={"green"}
                                                px="10px"
                                                type="text"
                                                fontSize={"md"}
                                                borderBottomWidth="2px"
                                                placeholder="Ex. ABC1D234"
                                                variant="flushed"
                                                onChange={handleVoucherChange}
                                                onKeyDown={onEnterfocusOnNextField(nameInput)}
                                            />
                                        </InputGroup>

                                        {!isRegisterVoucherValid ? (
                                            registerVoucher.trim() === "" ? (
                                                <Field.ErrorText color="red" fontSize={"sm"}>
                                                    O voucher é obrigatório
                                                </Field.ErrorText>
                                            ) : (
                                                <Field.ErrorText color="red" fontSize={"sm"}>
                                                    O voucher informado é inválido
                                                </Field.ErrorText>
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </Field.Root>

                                    <Field.Root required invalid={!isRegisterNameValid}>
                                        <Field.Label htmlFor="nameInput" fontSize={"lg"} mt="4">
                                            Nome
                                            <Field.RequiredIndicator />
                                        </Field.Label>

                                        <Input
                                            w="100%"
                                            ref={nameInput}
                                            required={true}
                                            id="name"
                                            colorPalette={"green"}
                                            px="10px"
                                            type="text"
                                            fontSize={"md"}
                                            onChange={handleNameChange}
                                            onKeyDown={onEnterfocusOnNextField(emailInput)}
                                            borderBottomWidth="2px"
                                            placeholder="Digite o seu nome completo"
                                            variant="flushed"
                                        />

                                        {!isRegisterNameValid ? (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                O nome é obrigatório
                                            </Field.ErrorText>
                                        ) : (
                                            <></>
                                        )}
                                    </Field.Root>

                                    <Field.Root required invalid={!isRegisterEmailValid}>
                                        <Field.Label htmlFor="emailInput" fontSize={"lg"} mt="4">
                                            Email
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup
                                            flex="1"
                                            endElement={
                                                isRegisterEmailLoading ? (
                                                    <Spinner colorPalette={"green"} />
                                                ) : isRegisterEmailValid && isRegisterEmailValidated ? (
                                                    <>
                                                        <LuCheck color="green" size={"20px"} />
                                                        <Text></Text>
                                                    </>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        >
                                            <Input
                                                w="100%"
                                                ref={emailInput}
                                                required={true}
                                                id="email"
                                                colorPalette={"green"}
                                                px="10px"
                                                type="email"
                                                fontSize={"md"}
                                                borderBottomWidth="2px"
                                                placeholder="Digite o seu melhor endereço de email"
                                                variant="flushed"
                                                onChange={handleEmailChange}
                                                onKeyDown={onEnterfocusOnNextField(userNameInput)}
                                            />
                                        </InputGroup>

                                        {isRegisterEmailValid ? (
                                            <></>
                                        ) : registerEmail?.trim() === "" ? (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                O email é obrigatório
                                            </Field.ErrorText>
                                        ) : isEmailValid(registerEmail) ? (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                O email já está em uso
                                            </Field.ErrorText>
                                        ) : (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                O email informado é inválido
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root required invalid={!isRegisterUserNameValid}>
                                        <Field.Label htmlFor="loginInput" fontSize={"lg"} mt="4">
                                            Usuário
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup
                                            flex="1"
                                            endElement={
                                                isRegisterUserNameLoading ? (
                                                    <Spinner colorPalette={"green"} />
                                                ) : isRegisterUserNameValid && isRegisterUserNameValidated ? (
                                                    <>
                                                        <LuCheck color="green" size={"20px"} />
                                                        <Text></Text>
                                                    </>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        >
                                            <Input
                                                w="100%"
                                                ref={userNameInput}
                                                required={true}
                                                id="username"
                                                colorPalette={"green"}
                                                px="10px"
                                                type="text"
                                                fontSize={"md"}
                                                // onKeyDown={enterOnLoginInput}
                                                borderBottomWidth="2px"
                                                placeholder="Digite o seu nome de usuário"
                                                variant="flushed"
                                                onChange={handleUserNameChange}
                                                onKeyDown={onEnterfocusOnNextField(passwordInput)}
                                            />
                                        </InputGroup>

                                        {isRegisterUserNameValid ? (
                                            <></>
                                        ) : registerUserName?.trim() === "" ? (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                O nome de usuário é obrigatório
                                            </Field.ErrorText>
                                        ) : isRegisterUserNameAvailable ? (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                O nome de usuário informado é inválido
                                            </Field.ErrorText>
                                        ) : (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                O nome de usuário já está em uso
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root required invalid={!isRegisterPasswordValid}>
                                        <Field.Label htmlFor="passwordInput" fontSize={"lg"} mt="4">
                                            Senha
                                            <Field.RequiredIndicator />
                                        </Field.Label>

                                        <PasswordInput
                                            w="100%"
                                            ref={passwordInput}
                                            required={true}
                                            colorPalette={"green"}
                                            px="10px"
                                            fontSize={"md"}
                                            id="password"
                                            type="password"
                                            // onKeyDown={enterOnPassInput}
                                            borderBottomWidth="2px"
                                            placeholder="Digite a sua senha"
                                            variant="flushed"
                                            onChange={handlePasswordChange}
                                            onKeyDown={onEnterfocusOnNextField(passwordDupInput)}
                                        />

                                        {isRegisterPasswordValid ? (
                                            <></>
                                        ) : registerPassword.trim() === "" ? (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                A senha é obrigatória
                                            </Field.ErrorText>
                                        ) : (
                                            <Field.ErrorText color="red" fontSize={"sm"}>
                                                A senha deve conter pelo menos 8 dígitos
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root
                                        required
                                        invalid={
                                            isRegisterPasswordValid &&
                                            isRegisterPasswordDupClicked &&
                                            !isRegisterPasswordDupValid
                                        }
                                    >
                                        <Field.Label htmlFor="passwordInput" fontSize={"lg"} mt="4">
                                            Confirmação da Senha
                                            <Field.RequiredIndicator />
                                        </Field.Label>

                                        <PasswordInput
                                            w="100%"
                                            ref={passwordDupInput}
                                            required={true}
                                            colorPalette={"green"}
                                            px="10px"
                                            fontSize={"md"}
                                            id="password"
                                            type="password"
                                            // onKeyDown={enterOnPassInput}
                                            borderBottomWidth="2px"
                                            placeholder="Digite a sua senha novamente"
                                            variant="flushed"
                                            onChange={handlePasswordDupChange}
                                            onKeyDown={onEnterSubmit}
                                        />

                                        {isRegisterPasswordDupClicked ? (
                                            isRegisterPasswordValid && !isRegisterPasswordDupValid ? (
                                                registerPasswordDup.trim() === "" ? (
                                                    <Field.ErrorText color="red" fontSize={"sm"}>
                                                        A confirmação da senha é obrigatório
                                                    </Field.ErrorText>
                                                ) : (
                                                    <Field.ErrorText color="red" fontSize={"sm"}>
                                                        As senhas devem ser iguais
                                                    </Field.ErrorText>
                                                )
                                            ) : (
                                                <></>
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </Field.Root>
                                </Stack>

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
                                        onClick={handleRegister}
                                        disabled={
                                            !(
                                                isRegisterVoucherValid &&
                                                isRegisterNameValid &&
                                                isRegisterEmailValid &&
                                                isRegisterUserNameValid &&
                                                isRegisterPasswordValid &&
                                                isRegisterPasswordDupValid &&
                                                isRegisterButtonActive
                                            )
                                        }
                                    >
                                        Registre-se
                                    </Button>
                                    <HStack gap={1} justify="center">
                                        <Text color="muted" fontSize={"md"}>
                                            Ja possui conta?{" "}
                                            <Link
                                                color={"green"}
                                                onClick={clickLogin}
                                                fontWeight={"medium"}
                                                variant="plain"
                                            >
                                                Log In
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
