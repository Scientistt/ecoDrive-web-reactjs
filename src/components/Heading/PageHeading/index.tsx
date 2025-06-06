import { memo } from "react";
import { Heading, Text, Flex } from "@chakra-ui/react";

import type { PageHeadingProps } from "types";

const PageHeading = (props: PageHeadingProps) => {
    //   const { Brand, moduleName } = useDashboardManager()
    // const moduleName = "Meu Módulo";

    return (
        <>
            <Flex
                w="100%"
                direction="column"
                pt="10px"
                gap={2}
                align={{ base: "flex-start", sm: "center", md: "flex-start" }}
            >
                <Heading fontSize={"4xl"} fontWeight={"bold"} colorPalette={"green"} colorScheme={"green"}>
                    {props.header}
                </Heading>

                <Text ml={"2px"} fontSize={"lg"} colorPalette={"green"}>
                    {props.description}
                </Text>
            </Flex>
        </>
    );
};

export default memo(PageHeading);
