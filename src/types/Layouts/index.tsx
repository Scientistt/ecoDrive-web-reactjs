import { type GridProps, FlexProps } from "@chakra-ui/react";

export interface ExplorerGridProps extends GridProps {
    isLoading: boolean;
    loadingFailed: boolean;
    eWidth: string;
}

export interface NavBarProps extends FlexProps {
    decoyProp?: string;
}
