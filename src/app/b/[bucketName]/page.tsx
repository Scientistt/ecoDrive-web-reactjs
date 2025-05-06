"use client";

// import { useState, useEffect } from "react";
// import { listBuckets } from "endpoints";
// import { Bucket } from "types";
// import { BucketContextProvider } from "contexts";
import { Body, PageHeading } from "components";
import { HStack, Spacer, Button } from "@chakra-ui/react";
import { LuRefreshCw } from "react-icons/lu";

// import { useRouter } from "next/router";

export default function BucketObjects() {
    // const { push, query } = useRouter();

    // const { bucket } = BucketContextProvider();

    // const [isLoading, setIsLoading] = useState(true);
    // const [isLoadFailed, setIsLoadFailed] = useState(false);
    // const [objects, setObjects] = useState({ elements: [], totalElements: 0 });

    // const loadBucketList = async () => {
    //     setIsLoading(true);
    //     setIsLoadFailed(false);
    //     try {
    //         const filter = {};
    //         const pagination = {
    //             limit: 0,
    //             page: 1
    //         };

    //         const objs = await listBuckets(filter, pagination);

    //         setBuckets(objs || { elements: [], totalElements: 0 });
    //     } catch {
    //         setIsLoadFailed(true);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     loadBucketList();
    // }, []);

    // const clickedRefresh = async () => {
    //     loadBucketList();
    // };

    // const clickedNewBucket = async () => {};

    return (
        <>
            <Body>
                <HStack>
                    <PageHeading header={"FOI"} description="Aqui o subtitulo" />
                    <Spacer />
                    <Button /*onClick={clickedRefresh} disabled={isLoading}*/ variant="subtle">
                        <LuRefreshCw /> Atualizar
                    </Button>
                    {/* <Button disabled onClick={clickedNewBucket}>
                        <LuPlus /> Novo Bucket
                    </Button> */}
                </HStack>
                {/* <ExplorerGrid isLoading={isLoading} loadingFailed={isLoadFailed} eWidth={"400px"}>
                    {buckets.elements.map((obj: Bucket, index) => {
                        return <BucketCard bucketName={obj.name} key={`bucketCard#${index}`} />;
                    })}
                </ExplorerGrid> */}
            </Body>
        </>
    );
}
