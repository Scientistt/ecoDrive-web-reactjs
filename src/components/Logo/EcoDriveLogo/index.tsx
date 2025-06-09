import { memo } from "react";
import { Heading, Image, HStack, VStack } from "@chakra-ui/react";
import { EcoDriveLogoProps } from "types";
import { ecoDrive } from "assets";

const EcoDriveLogo = (props: EcoDriveLogoProps) => {
    const sz = props.size || "big";
    const name = props.name || "ecoDrive";
    return sz === "big" ? (
        <VStack align={"center"} {...props}>
            <HStack align={"center"} {...props}>
                <Image w="70px" src={ecoDrive.logo.src} alt={name} />

                <Heading ml={"10px"} fontSize={60} color={{ base: "green.700", _dark: "green.200" }} mt={"-3"}>
                    {name}
                </Heading>
            </HStack>
        </VStack>
    ) : (
        <VStack align={"center"} {...props}>
            <HStack align={"center"} {...props}>
                <Image w="30px" src={ecoDrive.logo.src} alt={name} />

                <Heading ml={"5px"} color={{ base: "green.700", _dark: "green.200" }}>
                    {name}
                </Heading>
            </HStack>
        </VStack>
    );
};

export default memo(EcoDriveLogo);
