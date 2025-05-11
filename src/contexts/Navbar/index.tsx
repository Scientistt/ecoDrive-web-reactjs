"use client";

import { Flex, HStack, Text } from "@chakra-ui/react";
import { EcoDriveLogo } from "components";
import { ColorModeButton } from "components/ui/color-mode";

import { createContext, ReactNode, useContext } from "react";
import { NavbarContextType } from "types";
import { useAuthContext } from "contexts";

const defaultValues = {
    setUser: () => {}
};

export const NavbarContext = createContext<NavbarContextType>(defaultValues);

export function NavbarProvider({ children }: { children: ReactNode }) {
    const { user } = useAuthContext();

    console.log("que passa?", user);

    return (
        <>
            <Flex h="50px" w="full" align="center" justify="space-between" px={4}>
                <EcoDriveLogo size="sm" />
                <HStack gap={1}>
                    <Text>Olá, Fabio {user?.id}</Text>
                    <Flex align="center" gap={0}>
                        <ColorModeButton />
                    </Flex>
                </HStack>
            </Flex>
            {children}
        </>
    );
}

export const useNavbar = () => useContext(NavbarContext);
