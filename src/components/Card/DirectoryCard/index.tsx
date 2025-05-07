"use client";

import { memo } from "react";
import { Text, VStack, Image, Spacer } from "@chakra-ui/react";
import { parseDirectoryPath } from "utils";
import { BucketObjectProps } from "types";
import { FileDirectoryIcons } from "assets";

const DirectoryCard = (props: BucketObjectProps) => {
    const directory = parseDirectoryPath(props.bucketObject);
    return (
        <>
            <VStack
                p="5px"
                {...props}
                minW="90px"
                width="100%"
                cursor="pointer"
                textAlign="center"
                borderRadius="md"
                align="center"
                _hover={{ bg: { base: "white", _dark: "black" } }}
            >
                <VStack gap="0" w="80%">
                    <Image
                        width="100%"
                        height="auto"
                        top="5px"
                        src={directory.icon?.src || FileDirectoryIcons.folder.src}
                        alt={directory.name}
                        borderRadius="md"
                        objectFit="cover"
                        mx="auto"
                    />
                </VStack>

                <Text
                    mt="5px"
                    color="light"
                    fontSize="xs"
                    lineHeight="13px"
                    fontWeight="normal"
                    lineClamp={2}
                    overflow="hidden"
                    w="100%"
                >
                    {directory.name}
                </Text>

                <Spacer />
                <Text fontSize="xs" color={{ base: "gray.500", _dark: "gray.400" }} mt="-15px"></Text>
            </VStack>
        </>
    );
};

export default memo(DirectoryCard);
