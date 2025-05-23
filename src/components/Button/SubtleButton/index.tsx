import { memo } from "react";
import { Button } from "@chakra-ui/react";
import { SimpleButtonProps } from "types";

const SimpleButton = (props: SimpleButtonProps) => {
    return (
        <>
            <Button
                variant="subtle"
                fontSize={"md"}
                color={{ base: "green.800", _dark: "white" }}
                _hover={{ color: { base: "green.700", _dark: "green.100" } }}
                {...props}
            >
                {props.children}
            </Button>
        </>
    );
};

export default memo(SimpleButton);
