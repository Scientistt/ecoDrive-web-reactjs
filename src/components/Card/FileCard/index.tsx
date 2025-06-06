"use client";

import { memo } from "react";
import { Text, VStack, Image, Spacer, Progress, Icon } from "@chakra-ui/react";
import { BucketObjectProps } from "types";
import { parseFilePath, parseObjectSize, getAWSStorageClass } from "utils";
import { FileExtensionIcons } from "assets";
import { LuCheck } from "react-icons/lu";
import { useTranslations } from "next-intl";

const FileCard = (props: BucketObjectProps) => {
    const t = useTranslations("AWSStorageClass");
    const file = parseFilePath(props.bucketObject);
    const isSelected = !!props?.isSelected;

    const fileStorage = getAWSStorageClass(file.tier, t as unknown as typeof useTranslations);

    return (
        <>
            <VStack
                position="relative"
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
                    {file.restore?.status === "RESTORING" ? (
                        <Progress.Root
                            transform="rotate(180deg)"
                            mt={"-2px"}
                            width="77%"
                            striped
                            animated
                            value={100}
                            colorPalette="green"
                        >
                            <Progress.Track h="5px">
                                <Progress.Range bgColor={{ base: "green.500", _dark: "green.600" }} />
                            </Progress.Track>
                        </Progress.Root>
                    ) : (
                        <></>
                    )}

                    <Icon position={"absolute"} top="5px" left="5px" color={fileStorage.bgColor}>
                        {fileStorage.icon}
                    </Icon>

                    {file.restore?.status === "RESTORED" ? (
                        <Icon mt={"-16px"} ml={"-48px"} color={"green"} size={"md"}>
                            <LuCheck />
                        </Icon>
                    ) : (
                        <></>
                    )}
                </VStack>

                <Text
                    userSelect="none"
                    mt="5px"
                    color="light"
                    fontSize="small"
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
