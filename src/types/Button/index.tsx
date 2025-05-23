import { type ButtonProps, type IconButtonProps } from "@chakra-ui/react";

export interface SimpleButtonProps extends ButtonProps {
    scheme?: string;
}
export interface SimpleIconButtonProps extends IconButtonProps {
    tooltip?: string;
}
