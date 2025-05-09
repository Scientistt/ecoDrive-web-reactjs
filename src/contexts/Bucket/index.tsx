"use client";

import { Text } from "@chakra-ui/react";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { Bucket, BucketContextType } from "types";
import { getBucket } from "endpoints";
import { getBucketTagFields } from "utils";
import { useSupplier } from "contexts";
import { useParams } from "next/navigation";

const defaultValues = {
    bucket: { name: "my-default-bucket" },
    setBucket: () => {}
};

export const BucketContext = createContext<BucketContextType>(defaultValues);

export function BucketProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFailed, setIsLoadingFailed] = useState(false);
    const [bucket, setBucket] = useState<Bucket>({ name: "_default_" });
    const { bucketName } = useParams();
    const { supplier } = useSupplier();

    const getbucketInfo = async () => {
        setIsLoading(true);
        setIsLoadingFailed(false);

        try {
            if (bucket.name !== "_default_") {
            } else {
                if (bucketName !== null) {
                    const bucketInfos = await getBucket(supplier, `${bucketName}`);
                    setBucket({
                        ...bucketInfos,
                        ...getBucketTagFields(bucketInfos)
                    });
                } else {
                    setIsLoadingFailed(true);
                }
            }
        } catch {
            setIsLoadingFailed(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getbucketInfo();
    }, []);

    return (
        <BucketContext.Provider value={{ bucket, setBucket }}>
            {isLoading ? (
                <Text>Carregando informações do bucket...</Text>
            ) : isLoadingFailed ? (
                <Text>Erro ao carregar o bucket selecionado!</Text>
            ) : (
                children
            )}
        </BucketContext.Provider>
    );
}

export const useBucket = () => useContext(BucketContext);
