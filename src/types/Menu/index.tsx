import { type PortalProps } from "@chakra-ui/react";
import { User } from "types";

export interface UserNavbarMenuProps extends PortalProps {
    user?: User | null;
}
