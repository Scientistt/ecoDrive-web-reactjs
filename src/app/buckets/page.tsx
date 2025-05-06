import { Heading, VStack, Text } from "@chakra-ui/react";

import { PageHeading } from "components";

export default function Home() {
    return (
        <>
            <VStack
                minH="calc(100vh - 50px)"
                align="center"
                pt="10%"
                pb="10%"
                bg={{ base: "gray.100", _dark: "gray.800" }}
            >
                <PageHeading header="Meu titulo" />

                <Heading fontSize="5xl">🌿 EcoDrive</Heading>
                <Text fontWeight="bold" mt="10px">
                    Armazene com consciência. Use com liberdade.
                </Text>
                <Text textAlign="justify" fontWeight="normal" mt="10px">
                    Buckets
                </Text>
            </VStack>
        </>
    );
}
