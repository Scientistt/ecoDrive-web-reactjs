import { memo } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import { SimpleButtonProps } from "types";

const SimpleButton = (props: SimpleButtonProps) => {
    const color = props.textColor ? props.textColor : "green";
    const isLoading = !!props.isLoading;
    return (
        <>
            <Button
                variant="plain"
                fontSize={"md"}
                color={"white"}
                bg={`${color}.700`}
                _hover={{ bg: { base: `${color}.600`, _dark: `${color}.800` } }}
                {...props}
            >
                {isLoading ? <Spinner /> : props.children}
            </Button>
        </>
    );
};

export default memo(SimpleButton);
