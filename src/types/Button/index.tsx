import { type ButtonProps, type IconButtonProps } from "@chakra-ui/react";

export interface SimpleButtonProps extends ButtonProps {
    scheme?: string;
    textColor?: string;
}
export interface SimpleIconButtonProps extends IconButtonProps {
    tooltip?: string;
}
