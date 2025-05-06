"use client";

import { memo, useState, useEffect } from "react";
import { Card, HStack, VStack, Image, Text, Spacer, Spinner } from "@chakra-ui/react";
import { BucketCardProps, Bucket } from "types";
import { getBucket } from "endpoints";
import { DateBadge, AWSRegionBadge, TagsBadge } from "components";
import { bucketIcons } from "assets";

const BucketCard = (props: BucketCardProps) => {
    const bucketName = props.bucketName || "meu-bucket";
    const [bucket, setBucket] = useState<Bucket>({
        name: "my-bucket",
        description: "my description",
        tag_name: "Meu Bucket",
        created_at: undefined,
        region: "us-east-1",
        tags: [],
        icon: bucketIcons.default
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadindFailed, setIsLoadindFailed] = useState(false);

    const loadBucketInfo = async () => {
        setIsLoading(true);
        setIsLoadindFailed(false);

        try {
            if (bucketName !== null) {
                const bucketInfos = await getBucket(bucketName);

                let bucketTagsName = bucketInfos.name;
                let bucketDescription = ``;
                let bucketIcon = bucketIcons.default;
                for (const i in bucketInfos.tags) {
                    if (bucketInfos.tags[i].key === "name") bucketTagsName = bucketInfos.tags[i].value;
                    if (bucketInfos.tags[i].key === "description") bucketDescription = bucketInfos.tags[i].value;
                    if (bucketInfos.tags[i].key === "icon")
                        bucketIcon = bucketIcons[bucketInfos.tags[i].value] || bucketIcons.default;
                }

                setBucket({
                    ...bucketInfos,
                    tag_name: bucketTagsName,
                    description: bucketDescription,
                    icon: bucketIcon
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

    return (
        <Card.Root
            p="10px"
            minW="400px"
            width="100%"
            /*onClick={clickBucket}*/ cursor="pointer"
            _hover={{ bg: { base: "teal.100", _dark: "teal.900" } }}
        >
            <HStack gap="10px">
                <VStack gap="0" w="120px">
                    <Image
                        objectFit="cover"
                        w="90%"
                        h="90%"
                        // src={getBucketIcon(bucketInfo?.icon).src}
                        src={!isLoading && !isLoadindFailed ? bucket.icon.src : bucketIcons.default.src}
                        alt="Caffe Latte"
                    />
                </VStack>
                <VStack gap="0" w="100%" align="left">
                    <Text lineClamp={1} w="100%" fontWeight="bold" maxHeight="24px" overflow="hidden">
                        {!isLoading && !isLoadindFailed
                            ? bucket.tag_name
                                ? bucket.tag_name
                                : bucket.name
                            : bucketName}
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
                        {!isLoading && !isLoadindFailed ? bucket.name : bucketName}
                    </Text>

                    <Spacer />
                    {isLoading ? (
                        <HStack align={"start"} gap={1}>
                            <Spinner size="sm" mt="10px" />
                            <Text lineClamp={2} mt="10px" textAlign="left" overflow="hidden">
                                Carregando...
                            </Text>
                        </HStack>
                    ) : (
                        <Text
                            lineClamp={2}
                            mt="10px"
                            textAlign="left"
                            fontSize="sm"
                            fontWeight="light"
                            overflow="hidden"
                        >
                            {!isLoading && !isLoadindFailed ? bucket.description : ""}
                        </Text>
                    )}
                    {/* <Spinner size="sm" mt="10px" /> */}

                    {/* <Text lineClamp={2} mt="10px" textAlign="left" fontSize="sm" fontWeight="light" overflow="hidden">
                        {!isLoading && !isLoadindFailed ? bucket.description : ""}
                    </Text> */}
                </VStack>
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
                {/* <AWSRegionBadge region={bucketInfo ? bucketInfo.region : "..."} /> */}
            </HStack>
        </Card.Root>
    );
};

export default memo(BucketCard);
