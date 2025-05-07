import { type BreadcrumbRootProps } from "@chakra-ui/react";

export interface BreadcrumbProps extends BreadcrumbRootProps {
    path?: string;
    rootName?: string;
    onClickPath?: (path: string) => void;
}
