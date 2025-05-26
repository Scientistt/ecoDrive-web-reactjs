import { memo } from "react";
import { Button } from "@chakra-ui/react";
import { SimpleButtonProps } from "types";

const SimpleButton = (props: SimpleButtonProps) => {
    const color = props.textColor ? props.textColor : "green";
    return (
        <>
            <Button
                variant="subtle"
                fontSize={"md"}
                color={{ base: `${color}.800`, _dark: "white" }}
                _hover={{ color: { base: `${color}.700`, _dark: `${color}.100` } }}
                {...props}
            >
                {props.children}
            </Button>
        </>
    );
};

export default memo(SimpleButton);
