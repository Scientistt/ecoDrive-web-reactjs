"use client";

import { Text } from "@chakra-ui/react";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { Supplier, SupplierContextType } from "types";
import { getSupplier } from "endpoints";
import { useParams } from "next/navigation";
import { FullPageLoading } from "components";

const defaultValues = {
    supplier: { id: 0n, slug: "null", name: "null", status: "I", account_supplier: "null" },
    setSupplier: () => {}
};

export const SupplierContext = createContext<SupplierContextType>(defaultValues);

export function SupplierProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFailed, setIsLoadingFailed] = useState(false);
    const [supplier, setSupplier] = useState<Supplier>(defaultValues.supplier);
    const { supplierSlug } = useParams();

    const getSupplierInfo = async () => {
        setIsLoading(true);
        setIsLoadingFailed(false);

        try {
            if (`${supplier.id}` !== `0`) {
                // JA CHEGOU?
            } else {
                if (supplierSlug !== null) {
                    const supplierInfos = await getSupplier(`${supplierSlug}`);

                    setSupplier(supplierInfos);
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
        getSupplierInfo();
    }, []);

    // return <FullPageLoading message="Checando credenciais" />;
    return (
        <SupplierContext.Provider value={{ supplier, setSupplier }}>
            {isLoading ? (
                <FullPageLoading message="Checando credenciais" />
            ) : isLoadingFailed || `${supplier.id}` === `0` ? (
                <Text>Erro ao carregar o fornecedor selecionado!</Text>
            ) : (
                children
            )}
        </SupplierContext.Provider>
    );
}

export const useSupplier = () => useContext(SupplierContext);
