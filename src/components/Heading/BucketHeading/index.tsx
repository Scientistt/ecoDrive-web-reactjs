"use client";

import { memo } from "react";
import { HStack, VStack, Image, Text, Spacer } from "@chakra-ui/react";
import { BucketHeadingProps } from "types";
import { DateBadge, AWSRegionBadge, TagsBadge } from "components";
import { bucketIcons } from "assets";
import { useColorMode } from "contexts";

const BucketHeading = (props: BucketHeadingProps) => {
    const bucket = props.bucket;

    const { colorMode } = useColorMode();

    return (
        <HStack gap="10px">
            <VStack gap="0">
                <Image
                    objectFit="cover"
                    w="90%"
                    h="90%"
                    // src={getBucketIcon(bucketInfo?.icon).src}
                    src={
                        bucket.icon?.src ||
                        (colorMode === "light" ? bucketIcons.default_black.src : bucketIcons.default_white.src)
                    }
                    alt="Caffe Latte"
                />
            </VStack>
            <VStack gap="0" w="100%" align="left">
                <Text lineClamp={1} w="100%" fontWeight="bold" maxHeight="24px" overflow="hidden">
                    {bucket.tag_name ? bucket.tag_name : bucket.name}
                </Text>
                <Text
                    lineClamp={1}
                    w="100%"
                    textAlign="left"
                    fontSize="sm"
                    fontWeight="light"
                    maxHeight="24px"
                    overflow="hidden"
                >
                    {bucket.name}
                </Text>

                <Spacer />
                <Text lineClamp={2} mt="10px" textAlign="left" fontSize="sm" fontWeight="light" overflow="hidden">
                    {bucket.description}
                </Text>
                <Spacer />
                <HStack pt={"10px"}>
                    <DateBadge startText={"Criado em "} date={bucket.created_at} endText={"."} />
                    <AWSRegionBadge region={bucket.region} />
                    <TagsBadge tags={bucket.tags} />
                </HStack>
            </VStack>
        </HStack>
    );
};

export default memo(BucketHeading);
