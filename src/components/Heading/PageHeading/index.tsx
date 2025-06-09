import { memo } from "react";
import { Heading, Text, Flex } from "@chakra-ui/react";

import type { PageHeadingProps } from "types";

const PageHeading = (props: PageHeadingProps) => {
    return (
        <>
            <Flex
                w="100%"
                direction="column"
                pt="10px"
                gap={2}
                align={{ base: "flex-start", sm: "center", md: "flex-start" }}
            >
                <Heading fontSize={"4xl"} fontWeight={"bold"}>
                    {props.header}
                </Heading>

                <Text ml={"2px"} fontSize={"lg"}>
                    {props.description}
                </Text>
            </Flex>
        </>
    );
};

export default memo(PageHeading);
