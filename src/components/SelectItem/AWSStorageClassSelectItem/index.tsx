"use client";

import { memo /*useState, useEffect */ } from "react";
// import { Card, HStack, VStack, Image, Text, Spacer, Spinner } from "@chakra-ui/react";
// import { BucketCardProps, Bucket } from "types";
// import { getBucket } from "endpoints";
// import { useRouter } from "next/navigation";
// import { DateBadge, AWSRegionBadge, TagsBadge } from "components";
// import { bucketIcons /*aws*/ } from "assets";
// import { useColorMode, useSupplier } from "contexts";
import { LuFileX2 } from "react-icons/lu";

import { AWSStorageClassSelectItemProps } from "types";

import { VStack, Text, HStack, Icon } from "@chakra-ui/react";
import { SimpleTooltip } from "components/Tooltip";

const AWSStorageClassSelectItem = (props: AWSStorageClassSelectItemProps) => {
    const { name, key, bgColor, description, icon } = props.storageClass;
    return (
        <SimpleTooltip content={description}>
            <HStack>
                <Icon color={bgColor} size={"md"}>
                    {icon ? icon : <LuFileX2 />}
                </Icon>
                <VStack align={"left"} gap={0}>
                    <Text fontSize={"sm"} fontWeight={"normal"}>
                        {name}
                    </Text>
                    <Text fontSize={"xs"} fontWeight={"light"} mt={"-5px"}>
                        {key.toLowerCase()}
                    </Text>
                </VStack>
            </HStack>
        </SimpleTooltip>
    );
};

export default memo(AWSStorageClassSelectItem);
