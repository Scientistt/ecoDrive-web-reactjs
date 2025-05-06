"use client";

import { useState, useEffect } from "react";
import { listBuckets } from "endpoints";
import { Bucket } from "types";
import { Body, PageHeading, ExplorerGrid, BucketCard } from "components";

export default function Buckets() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadFailed, setIsLoadFailed] = useState(false);

    const [buckets, setBuckets] = useState({ elements: [], totalElements: 0 });

    const loadBucketList = async () => {
        console.log("Vamos consultar agora");
        setIsLoading(true);
        setIsLoadFailed(false);
        try {
            const filter = {};
            const pagination = {
                limit: 7,
                page: 1
            };
            console.log("Chamou");
            const objs = await listBuckets(filter, pagination);
            console.log("Que beleza: ", objs);
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

    return (
        <>
            <Body>
                <PageHeading header="Meus Buckets" description="Amazon Simple Storage Service (S3)" />
                <ExplorerGrid loading={isLoading} loadingFailed={isLoadFailed} eWidth={"400px"}>
                    {buckets.elements.map((obj: Bucket, index) => {
                        return <BucketCard bucketName={obj.name} key={`bucketCard#${index}`} />;
                    })}
                </ExplorerGrid>
            </Body>
        </>
    );
}
