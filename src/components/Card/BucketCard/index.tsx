"use client";

import { memo, useState, useEffect } from "react";
import { Card, HStack, VStack, Image, Text, Spacer, Spinner } from "@chakra-ui/react";
import { BucketCardProps, Bucket } from "types";
import { getBucket } from "endpoints";
import { useRouter } from "next/navigation";
import { DateBadge, AWSRegionBadge, TagsBadge } from "components";
import { bucketIcons /*aws*/ } from "assets";
import { useColorMode, useSupplier } from "contexts";
import { getBucketTagFields } from "utils";

const BucketCard = (props: BucketCardProps) => {
    const { supplier } = useSupplier();

    const bucketFromProps = { ...props.bucket, ...getBucketTagFields(props.bucket) };

    // const bucketName = "meu-bucket";
    const loadDetails = !!props.loadDetails;

    const [bucket, setBucket] = useState<Bucket>(bucketFromProps);

    console.log("My-bucket bucketFromProps: ", bucketFromProps);

    const { colorMode } = useColorMode();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadindFailed, setIsLoadindFailed] = useState(false);

    // const bucketContext = useBucket();

    const router = useRouter();

    const loadBucketInfo = async () => {
        console.log("NEED TO LOAD DETAILS? ", loadDetails);
        console.log("Current Bucket? ", bucket);
        if (!loadDetails) {
            return;
        }
        // return;
        setIsLoading(true);
        setIsLoadindFailed(false);

        try {
            if (bucket.name !== null) {
                const bucketInfos = await getBucket(supplier, bucket.name);
                console.log("MyBucket now is: ", {
                    ...bucketInfos,
                    ...getBucketTagFields(bucketInfos)
                });
                setBucket({
                    ...bucketInfos,
                    ...getBucketTagFields(bucketInfos)
                });
            } else {
            }
        } catch {
            setIsLoadindFailed(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBucketInfo();
    }, []);

    const clickBucket = () => {
        router.push(`/suppliers/${supplier.slug}/buckets/${bucket.name}/objects`);
    };

    return (
        <Card.Root
            p="10px"
            minW="400px"
            width="100%"
            onClick={clickBucket}
            cursor="pointer"
            _hover={{ bg: { base: "green.200", _dark: "green.800" } }}
        >
            <HStack gap="10px">
                <VStack gap="0" w="120px">
                    <Image
                        objectFit="cover"
                        w="90%"
                        h="90%"
                        // src={getBucketIcon(bucketInfo?.icon).src}
                        src={
                            !isLoading && !isLoadindFailed
                                ? bucket.icon?.src ||
                                  (colorMode === "light"
                                      ? bucketIcons.default_black.src
                                      : bucketIcons.default_white.src)
                                : colorMode === "light"
                                  ? bucketIcons.default_black.src
                                  : bucketIcons.default_white.src
                        }
                        alt="Caffe Latte"
                    />
                </VStack>
                <VStack gap="0" w="100%" align="left">
                    <Text lineClamp={1} w="100%" fontWeight="bold" maxHeight="24px" overflow="hidden">
                        {!isLoading && !isLoadindFailed ? (bucket.tag_name ? bucket.tag_name : bucket.name) : `...`}
                    </Text>

                    {isLoading ? (
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
                                {!isLoading && !isLoadindFailed ? bucket.name : `...`}
                            </Text>
                        </>
                    )}

                    <Spacer />
                    <Text lineClamp={2} mt="10px" textAlign="left" fontSize="sm" fontWeight="light" overflow="hidden">
                        {!isLoading && !isLoadindFailed ? bucket.description : ""}
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
                <DateBadge
                    startText={"Criado em "}
                    date={!isLoading && !isLoadindFailed ? bucket.created_at : undefined}
                    endText={"."}
                />
                <AWSRegionBadge region={!isLoading && !isLoadindFailed ? bucket.region : undefined} />
                <TagsBadge tags={!isLoading && !isLoadindFailed ? bucket.tags : []} />
            </HStack>
        </Card.Root>
    );
};

export default memo(BucketCard);
