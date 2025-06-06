"use client";

import { memo } from "react";
import { Card, HStack, VStack, Image, Text, Spacer, Spinner } from "@chakra-ui/react";
import { SupplierCardProps } from "types";
import { useColorMode } from "contexts";
import { getAccountSupplier, getIdAbbreviation } from "utils";
import { useTranslations } from "next-intl";

const SupplierCard = (props: SupplierCardProps) => {
    // const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations("AccountSupplier");
    const tCredential = useTranslations("Credentials");

    const supplier = props.supplier || {};
    const isLoading = !!props.isLoading;
    const isSelected = !!props.isSelected;
    const accountSupplier = getAccountSupplier(supplier.account_supplier, t as unknown as typeof useTranslations);

    const { colorMode } = useColorMode();

    return (
        <Card.Root
            p="10px"
            minW="400px"
            width="100%"
            cursor="pointer"
            _hover={{ bg: { base: "green.200", _dark: "green.800" } }}
            border={isSelected ? "1px dashed green" : "1px dashed rgba(255, 255, 255, 0)"}
            bg={isSelected ? { base: "green.100", _dark: "green.900" } : {}}
            {...props}
        >
            <HStack>
                {/* {isSelected && <Text fontSize={"small"}>#{supplier.id}</Text>} */}
                <Text fontSize={"small"}>#{getIdAbbreviation(supplier.id)}</Text>
                <Spacer />
                <Text fontSize={"small"}>{accountSupplier.name}</Text>
            </HStack>
            <HStack gap={"10px"}>
                <VStack gap="0" w="120px">
                    <Image
                        objectFit="cover"
                        w="90%"
                        h="90%"
                        // src={getBucketIcon(bucketInfo?.icon).src}
                        src={colorMode === "light" ? accountSupplier.logo_light.src : accountSupplier.logo_dark.src}
                        alt="Caffe Latte"
                    />
                    {/* <IdBadge myId={supplier.id} /> */}
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
                        {supplier.slug}
                    </Text>

                    <Text
                        lineClamp={isLoading ? 1 : 2}
                        textAlign="left"
                        fontSize="sm"
                        fontWeight="light"
                        overflow="hidden"
                    >
                        {supplier.description}
                    </Text>

                    {isLoading && (
                        <HStack align={"center"}>
                            <Spinner />
                            <Text textAlign="left" fontSize="sm" fontWeight="light" overflow="hidden">
                                {tCredential("loadingCredential")}
                            </Text>
                        </HStack>
                    )}
                </VStack>
            </HStack>
            <Spacer />
            <HStack w="100%" align="left" alignItems="left" textAlign="left" justify="left">
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
