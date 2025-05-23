import { memo } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

const Body = (props: BoxProps) => {
    return (
        <Box minH="calc(100vh - 50px)" p="10px" bg={{ base: "gray.100", _dark: "gray.900" }}>
            {props.children}
        </Box>
    );
};

export default memo(Body);
