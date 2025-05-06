"use client";

import { memo, useState, useEffect } from "react";
import { Card, HStack, VStack, Image, Text, Spacer, Spinner } from "@chakra-ui/react";
import { BucketCardProps, Bucket } from "types";
import { getBucket } from "endpoints";
import { DateBadge, AWSRegionBadge } from "components";

const BucketCard = (props: BucketCardProps) => {
    const bucketName = props.bucketName || "meu-bucket";
    const [bucket, setBucket] = useState<Bucket>({
        name: "my-bucket",
        description: "my description",
        tag_name: "Meu Bucket",
        created_at: new Date("1857-04-18"),
        region: "us-east-1"
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadindFailed, setIsLoadindFailed] = useState(false);

    const loadBucketInfo = async () => {
        setIsLoading(true);
        setIsLoadindFailed(false);

        try {
            if (bucketName !== null) {
                const bucketInfos = await getBucket(bucketName);

                let bucketTagsName = null;
                let bucketDescription = null;
                // const bucketIcon = null;
                for (const i in bucketInfos.tags) {
                    if (bucketInfos.tags[i].Key === "name") bucketTagsName = bucketInfos.tags[i].Value;
                    if (bucketInfos.tags[i].Key === "description") bucketDescription = bucketInfos.tags[i].Value;
                    // if (bucketInfos.tags[i].Key === "icon") bucketIcon = bucketInfos.tags[i].Value;
                }

                // setBucketInfo(null);
                setBucket({
                    ...bucketInfos,
                    tag_name: bucketTagsName,
                    description: bucketDescription
                    // icon: bucketIcon
                });
                console.log("Setou o bucket: ", bucket);
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
            key={props.key}
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
                        src={"https://cdn-icons-png.flaticon.com/512/190/190544.png"}
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
                <DateBadge date={!isLoading && !isLoadindFailed ? bucket.created_at : undefined} />
                <AWSRegionBadge region={!isLoading && !isLoadindFailed ? bucket.region : undefined} />
                {/* <AWSRegionBadge region={bucketInfo ? bucketInfo.region : "..."} /> */}
            </HStack>
        </Card.Root>
    );
};

export default memo(BucketCard);
