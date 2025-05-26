"use client";

import { memo } from "react";
import { Text, VStack, Image, Spacer } from "@chakra-ui/react";
import { BucketObjectProps } from "types";
import { SimpleTooltip } from "components";
import { parseFilePath, parseObjectSize } from "utils";
import { FileExtensionIcons } from "assets";

const FileCard = (props: BucketObjectProps) => {
    const file = parseFilePath(props.bucketObject);

    return (
        <>
            <SimpleTooltip
                content={`${file.name}${file.ext ? `.${file.ext}` : ""}`}
                openDelay={500}
                closeDelay={0}
                showArrow
            >
                <VStack
                    p="5px"
                    {...props}
                    minW="90px"
                    width="100%"
                    cursor="pointer"
                    textAlign="center"
                    borderRadius="md"
                    align="center"
                    _hover={{ bg: { base: "green.200", _dark: "green.800" } }}
                >
                    <VStack gap="0" w="80%">
                        <Image
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

                    <Text fontSize="xs" color={{ base: "gray.500", _dark: "gray.400" }} mt="-10px">
                        {parseObjectSize(file.size)}
                    </Text>
                </VStack>
            </SimpleTooltip>
        </>
    );
};

export default memo(FileCard);
