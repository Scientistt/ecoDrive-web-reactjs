import { memo } from "react";
import { Flex } from "@chakra-ui/react";
import { EcoDriveLogo } from "components";
import { ColorModeButton } from "components/ui/color-mode";

const Navbar = () => {
    return (
        <Flex h="50px" w="full" align="center" justify="space-between" px={4}>
            <EcoDriveLogo size="sm" />
            <Flex align="center" gap={0}>
                <ColorModeButton />
            </Flex>
        </Flex>
    );
};

export default memo(Navbar);
