"use client";

import { useState, useEffect } from "react";
import { listSuppliers } from "endpoints";
import { Supplier } from "types";

import { Body, PageHeading, ExplorerGrid, SupplierCard, SimpleButton, SubtleButton, toaster } from "components";
import { HStack, Spacer } from "@chakra-ui/react";
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

            const objs = await listSuppliers(filter, pagination);

            // throw Error("Simulnanod um erro aqui");

            setSuppliers(objs || { elements: [], totalElements: 0 });
        } catch {
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

    const clickedNewSupplier = async () => {
        toaster.create({
            type: "info",
            title: "Funcionalidade não disponível",
            description: "Estamos trabalhando para que, em breve, esta opção esteja disponível"
        });
    };

    return (
        <>
            <Body>
                <HStack>
                    <PageHeading header="Minhas credenciais" description="Fornecedores de serviços em núvem" />
                    <Spacer />
                    <SubtleButton onClick={clickedRefresh} disabled={isLoading}>
                        <LuRefreshCw /> Atualizar
                    </SubtleButton>
                    <SimpleButton onClick={clickedNewSupplier}>
                        <LuPlus /> Nova Credencial
                    </SimpleButton>
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
