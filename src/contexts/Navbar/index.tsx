"use client";

import { Flex, HStack } from "@chakra-ui/react";
import { EcoDriveLogo, UserNavbarMenu, LocaleSelect } from "components";
import { ColorModeButton } from "components/ui/color-mode";

import { createContext, ReactNode, useContext } from "react";
import { NavbarContextType } from "types";
import { useAuthContext } from "contexts";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const defaultValues = {
    setUser: () => {}
};

export const NavbarContext = createContext<NavbarContextType>(defaultValues);

export function NavbarProvider({ children }: { children: ReactNode }) {
    const { user } = useAuthContext();
    const router = useRouter();
    const t = useTranslations("NavBar");
    const clickMainLogo = () => {
        router.push("/");
    };

    return (
        <>
            <Flex
                h="50px"
                w="full"
                align="center"
                justify="space-between"
                px={4}
                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <EcoDriveLogo size="sm" name={t("title")} onClick={clickMainLogo} cursor={"pointer"} />
                <HStack gap={1}>
                    <LocaleSelect />

                    <Flex align="center" gap={0}>
                        <ColorModeButton />
                    </Flex>

                    <UserNavbarMenu user={user}></UserNavbarMenu>
                </HStack>
            </Flex>
            {children}
        </>
    );
}

export const useNavbar = () => useContext(NavbarContext);
