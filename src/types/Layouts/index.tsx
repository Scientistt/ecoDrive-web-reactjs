import { type GridProps } from "@chakra-ui/react";

export interface ExplorerGridProps extends GridProps {
    isLoading: boolean;
    loadingFailed: boolean;
    eWidth: string;
}
