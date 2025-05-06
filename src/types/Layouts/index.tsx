import { type GridProps } from "@chakra-ui/react";

export interface ExplorerGridProps extends GridProps {
    loading: boolean;
    loadingFailed: boolean;
    eWidth: string;
}
