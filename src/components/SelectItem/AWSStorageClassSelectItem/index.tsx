"use client";

import { memo /*useState, useEffect */ } from "react";
// import { Card, HStack, VStack, Image, Text, Spacer, Spinner } from "@chakra-ui/react";
// import { BucketCardProps, Bucket } from "types";
// import { getBucket } from "endpoints";
// import { useRouter } from "next/navigation";
// import { DateBadge, AWSRegionBadge, TagsBadge } from "components";
// import { bucketIcons /*aws*/ } from "assets";
// import { useColorMode, useSupplier } from "contexts";
import { LuToilet } from "react-icons/lu";

import { AWSStorageClassSelectItemProps } from "types";

import { VStack, Text, HStack, Icon } from "@chakra-ui/react";
import { SimpleTooltip } from "components/Tooltip";

const AWSStorageClassSelectItem = (props: AWSStorageClassSelectItemProps) => {
    const { name, key, bgColor, description } = props.storageClass;
    return (
        <SimpleTooltip content={description}>
            <HStack w={"100%"}>
                <Icon color={bgColor} size={"lg"}>
                    <LuToilet />
                </Icon>
                <VStack align={"left"}>
                    <Text fontSize={"sm"} fontWeight={"normal"}>
                        {name}
                    </Text>
                    <Text fontSize={"xs"} mt={"-10px"} fontWeight={"light"}>
                        {key}
                    </Text>
                </VStack>
            </HStack>
        </SimpleTooltip>
    );
};

export default memo(AWSStorageClassSelectItem);
