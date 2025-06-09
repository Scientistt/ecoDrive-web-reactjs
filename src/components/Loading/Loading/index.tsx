"use client";
import { memo } from "react";
import { Center, Spinner, Heading } from "@chakra-ui/react";
import { LoadingProps } from "types";
import { useEffect, useState } from "react";

const Loading = (props: LoadingProps) => {
    const loadingMessage = props.messageLoading || "Loading";
    const isLoading = !!props.isLoading;

    const loadedMessage = props.messageLoaded || "Loading";
    const hasLoaded = !!props.hasLoaded;

    const [dots, setDots] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev % 3) + 1); // alterna entre 1, 2 e 3
        }, 500);

        return () => clearInterval(interval); // limpa ao desmontar
    }, []);

    if (isLoading)
        return (
            // ToDo: Fazer o texto base ficar parado e os pontinhos mexerem
            <Center>
                <Spinner />{" "}
                <Heading fontSize={"lg"} fontWeight={"normal"} pl="10px">
                    {loadingMessage}
                    {".".repeat(dots)}
                </Heading>
            </Center>
        );

    if (hasLoaded)
        return (
            <Center>
                <Heading fontSize={"lg"} fontWeight={"normal"} color={{ base: "gray.400", _dark: "gray.500" }}>
                    {loadedMessage}
                </Heading>
            </Center>
        );
    return <></>;
};

export default memo(Loading);
