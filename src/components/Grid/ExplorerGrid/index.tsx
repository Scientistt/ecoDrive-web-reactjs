import { memo } from "react";
import { Grid, Image, HStack, VStack, Spinner, Heading } from "@chakra-ui/react";
import { ExplorerGridProps } from "types";
import { LoadingIcons } from "assets";

const ExplorerGrid = (props: ExplorerGridProps) => {
    const elementWidth = props.eWidth || "100px";
    const isLoading: boolean = props.isLoading;
    const hasLoadingFailed = !!props.loadingFailed;

    return isLoading ? (
        <VStack align={"center"}>
            <HStack align={"center"} pt="50px">
                <Spinner /> <Heading>Carregando...</Heading>
            </HStack>
        </VStack>
    ) : hasLoadingFailed ? (
        <VStack align={"center"}>
            <HStack align={"center"} pt="50px">
                <VStack align={"center"}>
                    <Image w="200px" src={LoadingIcons.failed.src} alt="Falha a carregar os dados" />{" "}
                    <Heading>Alguma coisa deu errado</Heading>
                </VStack>
            </HStack>
        </VStack>
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
