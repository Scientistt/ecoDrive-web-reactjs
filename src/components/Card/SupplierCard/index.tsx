"use client";

import { memo } from "react";
import { Card, HStack, VStack, Image, Text, Spacer } from "@chakra-ui/react";
import { SupplierCardProps } from "types";
import { aws, LoadingIcons, oracle } from "assets";
import { useColorMode } from "contexts";
// import { useRouter } from "next/navigation";

const SupplierCard = (props: SupplierCardProps) => {
    // const [isLoading, setIsLoading] = useState(false);

    const supplier = props.supplier || {};
    const isSelected = !!props.isSelected;

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
            <HStack gap={"10px"}>
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
                                : supplier.account_supplier === "oracle"
                                  ? colorMode === "light"
                                      ? oracle.logo_light.src
                                      : oracle.logo_dark.src
                                  : LoadingIcons.failed.src
                        }
                        alt="Caffe Latte"
                    />
                    {/* <IdBadge myId={supplier.id} /> */}
                </VStack>
                <VStack gap="0" w="100%" align="left">
                    <Text lineClamp={1} w="100%" fontWeight="bold" maxHeight="24px" overflow="hidden">
                        {supplier.name}
                    </Text>

                    {/* {isLoading ? (
                        <>
                            <HStack>
                                <Spinner size="sm" />
                                <Text
                                    lineClamp={1}
                                    w="100%"
                                    textAlign="left"
                                    fontSize="sm"
                                    fontWeight="light"
                                    maxHeight="24px"
                                    overflow="hidden"
                                >
                                    Carregando...
                                </Text>
                            </HStack>
                        </>
                    ) : (
                        <>
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
                        </>
                    )} */}

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

                    <Text lineClamp={2} textAlign="left" fontSize="sm" fontWeight="light" overflow="hidden">
                        {supplier.description}
                    </Text>

                    {/* <Spinner size="sm" mt="10px" /> */}

                    {/* <Text lineClamp={2} mt="10px" textAlign="left" fontSize="sm" fontWeight="light" overflow="hidden">
                        {!isLoading && !isLoadindFailed ? bucket.description : ""}
                    </Text> */}
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
