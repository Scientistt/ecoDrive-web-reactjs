import { memo } from "react";
import { Button } from "@chakra-ui/react";
import { SimpleButtonProps } from "types";

const SimpleButton = (props: SimpleButtonProps) => {
    return (
        <>
            <Button
                variant="plain"
                fontSize={"md"}
                color={"white"}
                bg={"green.700"}
                _hover={{ bg: { base: "green.600", _dark: "green.800" } }}
                {...props}
            >
                {props.children}
            </Button>
        </>
    );
};

export default memo(SimpleButton);
