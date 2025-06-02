"use client";
import { memo } from "react";
import { HStack, Spinner, VStack, Heading, Spacer } from "@chakra-ui/react";
import { LoadingProps } from "types";
import { useEffect, useState } from "react";

const FullPageLoading = (props: LoadingProps) => {
    const loadingMessage = props.message || "Carregando";
    const [dots, setDots] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev % 3) + 1); // alterna entre 1, 2 e 3
        }, 500);

        return () => clearInterval(interval); // limpa ao desmontar
    }, []);

    return (
        <VStack
            align={"center"}
            minH="calc(100vh - 50px)"
            overflow={"hidden"}
            bg={{ base: "gray.100", _dark: "gray.800" }}
        >
            <Spacer />

            <HStack align={"center"}>
                <Spinner />{" "}
                <Heading pl="10px">
                    {loadingMessage}
                    {".".repeat(dots)}
                </Heading>
            </HStack>
            <Spacer />
            <Spacer />
            <Spacer />
        </VStack>
    );
};

export default memo(FullPageLoading);
