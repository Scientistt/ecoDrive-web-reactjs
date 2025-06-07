"use client";

import { memo /*useState, useEffect */ } from "react";
// import { Card, HStack, VStack, Image, Text, Spacer, Spinner } from "@chakra-ui/react";
// import { BucketCardProps, Bucket } from "types";
// import { getBucket } from "endpoints";
// import { useRouter } from "next/navigation";
// import { DateBadge, AWSRegionBadge, TagsBadge } from "components";
// import { bucketIcons /*aws*/ } from "assets";
// import { useColorMode, useSupplier } from "contexts";

import { AccountSupplierItemProps } from "types";

import { VStack, Text, HStack, Image } from "@chakra-ui/react";
import { useColorMode } from "contexts";

const AccountSupplierSelectItem = (props: AccountSupplierItemProps) => {
    console.log("props.accountSupplier: ", props.accountSupplier);
    const { name, key, logo_dark, logo_light } = props.accountSupplier;
    const { colorMode } = useColorMode();
    return (
        <HStack>
            <Image
                objectFit="cover"
                w={"35px"}
                // w="90%"
                // h="90%"
                // src={getBucketIcon(bucketInfo?.icon).src}
                src={colorMode === "light" ? logo_light.src : logo_dark.src}
                alt={key}
            />
            <VStack align={"left"} gap={0}>
                <Text fontSize={"sm"} fontWeight={"normal"}>
                    {name}
                </Text>
                <Text fontSize={"xs"} fontWeight={"light"} mt={"-5px"}>
                    {key.toLowerCase()}
                </Text>
            </VStack>
        </HStack>
    );
};

export default memo(AccountSupplierSelectItem);
