import { Heading, VStack, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <>
            <VStack align="center" pt="10%" pl="30%" pr="30%">
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
