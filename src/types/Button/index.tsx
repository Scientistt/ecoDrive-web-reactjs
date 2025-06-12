import { type ButtonProps, type IconButtonProps } from "@chakra-ui/react";

export interface SimpleButtonProps extends ButtonProps {
    scheme?: string;
    textColor?: string;
    isLoading?: boolean;
}
export interface SimpleIconButtonProps extends IconButtonProps {
    tooltip?: string;
}
