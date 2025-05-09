"use client";

import { useState, useEffect } from "react";
import { listSuppliers } from "endpoints";
import { Supplier } from "types";

import { Body, PageHeading, ExplorerGrid, SupplierCard } from "components";
import { HStack, Spacer, Button } from "@chakra-ui/react";
import { LuRefreshCw, LuPlus } from "react-icons/lu";

export default function Buckets() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadFailed, setIsLoadFailed] = useState(false);

    const [suppliers, setSuppliers] = useState({ elements: [], totalElements: 0 });

    const loadSuppliersList = async () => {
        setIsLoading(true);
        setIsLoadFailed(false);
        try {
            const filter = {};
            const pagination = {
                limit: 13,
                page: 1
            };

            console.log("B4");
            const objs = await listSuppliers(filter, pagination);

            console.log("objs: ", objs);

            // throw Error("Simulnanod um erro aqui");

            setSuppliers(objs || { elements: [], totalElements: 0 });
        } catch (error) {
            console.log("error: ", error);

            setIsLoadFailed(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSuppliersList();
    }, []);

    const clickedRefresh = async () => {
        loadSuppliersList();
    };

    const clickedNewSupplier = async () => {};

    return (
        <>
            <Body>
                <HStack>
                    <PageHeading header="Minhas credenciais" description="Fornecedores de serviços em núvem" />
                    <Spacer />
                    <Button onClick={clickedRefresh} disabled={isLoading} variant="subtle">
                        <LuRefreshCw /> Atualizar
                    </Button>
                    <Button disabled onClick={clickedNewSupplier}>
                        <LuPlus /> Nova Credencial
                    </Button>
                </HStack>
                <ExplorerGrid isLoading={isLoading} loadingFailed={isLoadFailed} eWidth={"400px"}>
                    {suppliers.elements.map((obj: Supplier, index) => {
                        return <SupplierCard supplier={obj} key={`supplierCard#${index}`} />;
                    })}
                </ExplorerGrid>
            </Body>
        </>
    );
}
