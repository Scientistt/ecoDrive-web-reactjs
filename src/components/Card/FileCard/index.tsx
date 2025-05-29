"use client";

import { memo } from "react";
import { Text, VStack, Image, Spacer } from "@chakra-ui/react";
import { BucketObjectProps } from "types";
import { parseFilePath, parseObjectSize } from "utils";
import { FileExtensionIcons } from "assets";

const FileCard = (props: BucketObjectProps) => {
    const file = parseFilePath(props.bucketObject);
    const isSelected = !!props?.isSelected;

    return (
        <>
            <VStack
                userSelect="none"
                draggable={false}
                p="5px"
                minW="90px"
                width="100%"
                cursor="pointer"
                textAlign="center"
                borderRadius="md"
                align="center"
                borderColor="pink"
                border={isSelected ? "1px dashed green" : "1px dashed rgba(255, 255, 255, 0)"}
                bg={isSelected ? { base: "green.100", _dark: "green.900" } : {}}
                _hover={{ bg: { base: "green.200", _dark: "green.800" } }}
                {...props}
            >
                <VStack gap="0" w="80%">
                    <Image
                        userSelect="none"
                        draggable={false}
                        width="100%"
                        height="auto"
                        top="5px"
                        src={file.icon?.src || FileExtensionIcons.blank.src}
                        alt={file.name}
                        borderRadius="md"
                        objectFit="cover"
                        mx="auto"
                    />
                </VStack>

                <Text
                    userSelect="none"
                    mt="5px"
                    color="light"
                    fontSize="sm"
                    fontWeight="normal"
                    lineClamp={2}
                    overflow="hidden"
                    w="100%"
                >
                    {file.name}
                </Text>

                <Spacer />

                <Text userSelect="none" fontSize="xs" color={{ base: "gray.500", _dark: "gray.400" }} mt="-10px">
                    {parseObjectSize(file.size)}
                </Text>
            </VStack>
        </>
    );
};

export default memo(FileCard);
