"use client";

import { useState, useEffect } from "react";
import { listBuckets } from "endpoints";
import { Bucket } from "types";
import { useSupplier } from "contexts";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
    Body,
    PageHeading,
    ExplorerGrid,
    BucketCard,
    SimpleButton,
    SubtleButton,
    SimpleIconButton,
    NewBucketDrawer
} from "components";
import { HStack, Spacer } from "@chakra-ui/react";
import { LuRefreshCw, LuPlus, LuArrowLeft, LuSparkle, LuSparkles } from "react-icons/lu";

export default function Buckets() {
    const { supplier } = useSupplier();
    const router = useRouter();
    const t = useTranslations("Buckets");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadFailed, setIsLoadFailed] = useState(false);

    const [isNewBucketDrawerOpen, setIsNewBucketDrawerOpen] = useState(false);

    const [isToLoadEachBucketDetail, setIsToLoadEachBucketDetail] = useState(false);

    const [buckets, setBuckets] = useState({ elements: [], totalElements: 0 });

    const loadBucketList = async () => {
        setIsLoading(true);
        setIsLoadFailed(false);
        try {
            const filter = {
                // details: isToLoadEachBucketDetail
                details: false
            };
            const pagination = {
                limit: 30,
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
    }, [isToLoadEachBucketDetail]);

    const clickedRefresh = async () => {
        loadBucketList();
    };

    const loadBucketDetails = async () => {
        setIsToLoadEachBucketDetail(true);
    };

    const doNotLoadBucketDetails = async () => {
        setIsToLoadEachBucketDetail(false);
    };

    const clickBackToSuppliers = async () => {
        router.push("/suppliers");
    };

    const clickedNewBucket = async () => {
        setIsNewBucketDrawerOpen(true);
    };

    const clickedCloseNewBucket = async () => {
        setIsNewBucketDrawerOpen(false);
    };

    return (
        <>
            <Body>
                <SubtleButton onClick={clickBackToSuppliers}>
                    <LuArrowLeft />
                    {t("backToCredentials")}
                </SubtleButton>
                <HStack>
                    <PageHeading header={t("title")} description={t("description")} />

                    <Spacer />

                    {isToLoadEachBucketDetail ? (
                        <SimpleIconButton tooltip={t("doNotLoadBucketDetails")} onClick={doNotLoadBucketDetails}>
                            <LuSparkle />
                        </SimpleIconButton>
                    ) : (
                        <SimpleIconButton tooltip={t("loadBucketDetails")} onClick={loadBucketDetails}>
                            <LuSparkles />
                        </SimpleIconButton>
                    )}

                    <SubtleButton onClick={clickedRefresh} disabled={isLoading}>
                        <LuRefreshCw /> {t("update")}
                    </SubtleButton>
                    <SimpleButton onClick={clickedNewBucket}>
                        <LuPlus /> {t("newBucket")}
                    </SimpleButton>
                </HStack>

                <ExplorerGrid isLoading={isLoading} loadingFailed={isLoadFailed} eWidth={"400px"}>
                    {buckets.elements.map((obj: Bucket, index) => {
                        return (
                            <BucketCard
                                bucket={obj}
                                loadDetails={isToLoadEachBucketDetail}
                                key={`bucketCard#${index}`}
                            />
                        );
                    })}
                </ExplorerGrid>

                <NewBucketDrawer isOpen={isNewBucketDrawerOpen} onClose={clickedCloseNewBucket} onOpen={() => {}} />
            </Body>
        </>
    );
}
