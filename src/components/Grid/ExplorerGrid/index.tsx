import { memo } from "react";
import { Grid, Box } from "@chakra-ui/react";
import { ExplorerGridProps } from "types";

const ExplorerGrid = (props: ExplorerGridProps) => {
    const elementWidth = props.eWidth || "100px";
    const isLoading: boolean = props.isLoading;
    const hasLoadingFailed = !!props.loadingFailed;
    return isLoading ? (
        <Box>Carregando.....</Box>
    ) : hasLoadingFailed ? (
        <Box>Falhouuuuu</Box>
    ) : (
        <Grid
            templateColumns={`repeat(auto-fill, minmax(${elementWidth}, 1fr))`}
            gap="5px"
            justifyContent="start"
            {...props}
        >
            {props.children}
        </Grid>
    );
};

export default memo(ExplorerGrid);
