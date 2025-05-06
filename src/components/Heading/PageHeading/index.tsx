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
                pb="20px"
                gap={1}
                align={{ base: "flex-start", sm: "center", md: "flex-start" }}
            >
                <Heading>{props.header}</Heading>
                <Text>{props.description}</Text>
            </Flex>
        </>
    );
};

export default memo(PageHeading);
