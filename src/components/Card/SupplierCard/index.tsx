"use client";

import { memo } from "react";
import { Card, HStack, VStack, Image, Text, Spacer } from "@chakra-ui/react";
import { SupplierCardProps } from "types";
import { aws, LoadingIcons } from "assets";
import { useColorMode } from "contexts";
import { useRouter } from "next/navigation";

const SupplierCard = (props: SupplierCardProps) => {
    const supplier = props.supplier || {};

    const { colorMode } = useColorMode();
    const router = useRouter();

    const clickSupplier = () => {
        router.push(`/suppliers/${supplier.slug}/buckets`);
    };

    return (
        <Card.Root
            p="10px"
            minW="400px"
            width="100%"
            onClick={clickSupplier}
            cursor="pointer"
            _hover={{ bg: { base: "teal.100", _dark: "teal.900" } }}
        >
            <HStack gap="10px">
                <VStack gap="0" w="120px">
                    <Image
                        objectFit="cover"
                        w="90%"
                        h="90%"
                        // src={getBucketIcon(bucketInfo?.icon).src}
                        src={
                            supplier.account_supplier === "aws"
                                ? colorMode === "light"
                                    ? aws.logo_light.src
                                    : aws.logo_dark.src
                                : LoadingIcons.failed.src
                        }
                        alt="Caffe Latte"
                    />
                </VStack>
                <VStack gap="0" w="100%" align="left">
                    <Text lineClamp={1} w="100%" fontWeight="bold" maxHeight="24px" overflow="hidden">
                        {supplier.name}
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
                        {supplier.name}
                    </Text>

                    <Spacer />
                    <Text lineClamp={2} mt="10px" textAlign="left" fontSize="sm" fontWeight="light" overflow="hidden">
                        {supplier.description}
                    </Text>
                    {/* <Spinner size="sm" mt="10px" /> */}

                    {/* <Text lineClamp={2} mt="10px" textAlign="left" fontSize="sm" fontWeight="light" overflow="hidden">
                        {!isLoading && !isLoadindFailed ? bucket.description : ""}
                    </Text> */}
                </VStack>

                {/* <Image bg='gren' w='35px' right={'10px'}  top={'5px'} position={'absolute'} src={aws.logo_light.src} alt="AWS" /> */}
            </HStack>
            <Spacer />
            <HStack w="100%" pt="10px" align="left" alignItems="left" textAlign="left" justify="left">
                {/* <DateBadge
                    startText={"Criado em "}
                    date={!isLoading && !isLoadindFailed ? bucket.created_at : undefined}
                    endText={"."}
                />
                <AWSRegionBadge region={!isLoading && !isLoadindFailed ? bucket.region : undefined} />
                <TagsBadge tags={!isLoading && !isLoadindFailed ? bucket.tags : []} /> */}
                {/* <AWSRegionBadge region={bucketInfo ? bucketInfo.region : "..."} /> */}
            </HStack>
        </Card.Root>
    );
};

export default memo(SupplierCard);
