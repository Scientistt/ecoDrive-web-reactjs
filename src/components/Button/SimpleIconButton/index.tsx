import { memo } from "react";
import { IconButton } from "@chakra-ui/react";
import { SimpleTooltip } from "components";
import { SimpleIconButtonProps } from "types";

const SimpleIconButton = (props: SimpleIconButtonProps) => {
    const tooltip = props?.tooltip || "";
    if (tooltip !== "")
        return (
            <>
                <SimpleTooltip content={tooltip}>
                    <IconButton
                        variant="subtle"
                        fontSize={"md"}
                        color={{ base: "green.800", _dark: "white" }}
                        _hover={{ color: { base: "green.700", _dark: "green.100" } }}
                        {...props}
                    >
                        {props.children}
                    </IconButton>
                </SimpleTooltip>
            </>
        );
    return (
        <>
            <IconButton
                fontSize={"md"}
                color={{ base: "green.800", _dark: "white" }}
                _hover={{ color: { base: "green.700", _dark: "green.100" } }}
                variant="subtle"
                {...props}
            >
                {props.children}
            </IconButton>
        </>
    );
};

export default memo(SimpleIconButton);
