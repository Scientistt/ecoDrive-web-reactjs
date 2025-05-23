import { type FlexProps } from "@chakra-ui/react";
import { User } from "types";

export interface NavbarProps extends FlexProps {
    user?: User;
}

export interface NavbarContextType {
    user?: User;
    setUser: (supplier: string) => void;
}
