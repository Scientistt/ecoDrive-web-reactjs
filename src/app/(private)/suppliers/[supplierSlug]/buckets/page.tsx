"use client";

import { useState, useEffect } from "react";
import { listBuckets } from "endpoints";
import { Bucket } from "types";
import { useSupplier } from "contexts";

import { Body, PageHeading, ExplorerGrid, BucketCard } from "components";
import { HStack, Spacer, Button } from "@chakra-ui/react";
import { LuRefreshCw, LuPlus } from "react-icons/lu";

export default function Buckets() {
    const { supplier } = useSupplier();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadFailed, setIsLoadFailed] = useState(false);

    const [buckets, setBuckets] = useState({ elements: [], totalElements: 0 });

    const loadBucketList = async () => {
        setIsLoading(true);
        setIsLoadFailed(false);
        try {
            const filter = {};
            const pagination = {
                limit: 13,
                page: 1
            };

            const objs = await listBuckets(supplier, filter, pagination);

            // throw Error("Simulnanod um erro aqui");

            setBuckets(objs || { elements: [], totalElements: 0 });
        } catch {
            setIsLoadFailed(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBucketList();
    }, []);

    const clickedRefresh = async () => {
        loadBucketList();
    };

    const clickedNewBucket = async () => {};

    return (
        <>
            <Body>
                <HStack>
                    <PageHeading header="Meus Buckets" description="Amazon Simple Storage Service (S3)" />
                    <Spacer />
                    <Button onClick={clickedRefresh} disabled={isLoading} variant="subtle">
                        <LuRefreshCw /> Atualizar
                    </Button>
                    <Button disabled onClick={clickedNewBucket}>
                        <LuPlus /> Novo Bucket
                    </Button>
                </HStack>
                <ExplorerGrid isLoading={isLoading} loadingFailed={isLoadFailed} eWidth={"400px"}>
                    {buckets.elements.map((obj: Bucket, index) => {
                        return <BucketCard bucketName={obj.name} key={`bucketCard#${index}`} />;
                    })}
                </ExplorerGrid>
            </Body>
        </>
    );
}
