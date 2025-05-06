"use client";
import { createContext } from "react";
import { Bucket } from "types";
import { Text } from "@chakra-ui/react";

type BucketContextType = {
    bucket: Bucket;
    // changePrimaryColor: (value: string) => void;
};

export const BucketContext = createContext<BucketContextType>({
    bucket: { name: "my-bucket" }
});

export function BucketContextProvider() {
    // const [isLoading, setIsLoading] = useState(true);
    // const [isLoadingFailed, setIsLoadingFailed] = useState(true);
    // const [bucket, setBucket] = useState({ name: "my-bucket" });

    return (
        <BucketContext.Provider value={{ bucket: { name: "my-bucket-context" } }}>
            {/* {isLoading ? (
                <Text>Carregando bucket</Text>
            ) : isLoadingFailed ? (
                <Text>Erro ao carregar Bucket</Text>
            ) : (
                children
            )} */}
            <>
                <Text>Usando o BucketContextProvider</Text>
            </>
        </BucketContext.Provider>
    );
}
