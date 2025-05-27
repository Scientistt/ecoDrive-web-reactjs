"use client";

import { useEffect, useState } from "react";
import { listBucketObjects } from "endpoints";
// import { Bucket } from "types";
// import { BucketContextProvider } from "contexts";

import {
    Body,
    BucketHeading,
    ExplorerGrid,
    DirectoryCard,
    FileCard,
    Breadcrumb,
    SubtleButton,
    SimpleButton,
    SimpleIconButton,
    NewFileDrawer
} from "components";

import { HStack, Spacer, useDisclosure } from "@chakra-ui/react";
import { LuRefreshCw, LuArrowLeft, LuFile, LuFolderTree, LuUpload } from "react-icons/lu";
import { useBucket, useSupplier } from "contexts";
import { useRouter } from "next/navigation";
import { BucketObject } from "types";
// import { useRouter } from "next/navigation";

// import { useRouter } from "next/router";

export default function BucketObjects() {
    const router = useRouter();
    // const router = useRouter();
    const { bucket /*setBucket*/ } = useBucket();
    const { supplier /*setBucket*/ } = useSupplier();

    // const { bucket } = BucketContextProvider();

    const { open, onOpen, onClose } = useDisclosure();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadFailed, setIsLoadFailed] = useState(false);
    const [currentPath, setCurrentPath] = useState("");
    const [lastKnownPath, setLastKnownPath] = useState("");

    const [isShowingDirectories, setIsShowingDirectories] = useState(true);
    const [objects, setObjects] = useState({ elements: [], totalElements: 0 });

    // test

    // const inputRef = useRef<HTMLInputElement>(null);

    const loadBucketObjects = async () => {
        setIsLoading(true);
        setIsLoadFailed(false);
        try {
            const filter = {
                prefix: isShowingDirectories ? currentPath : "",
                tree: isShowingDirectories
            };
            const pagination = {
                limit: 0,
                page: 1
            };

            const objs = await listBucketObjects(supplier, bucket, filter, pagination);

            setObjects(objs || { elements: [], totalElements: 0 });
        } catch {
            setIsLoadFailed(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBucketObjects();
    }, [currentPath, isShowingDirectories]);

    const seeFilesOnly = async () => {
        setLastKnownPath(currentPath);
        setCurrentPath("");
        setIsShowingDirectories(false);
    };

    const seeDirectories = async () => {
        setCurrentPath(lastKnownPath);
        setIsShowingDirectories(true);
    };

    const clickedRefresh = async () => {
        loadBucketObjects();
    };

    const clickedUpload = async () => {
        onOpen();
    };

    const clickedCloseFileUpload = async () => {
        console.log("Fecha o drawer");
        onClose();
    };

    const clickBackToBuckets = async () => {
        router.push(`/suppliers/${supplier.slug}/buckets`);
    };

    const clickDirectory = async (obj: BucketObject) => {
        setCurrentPath(obj.name);
    };

    const clickBreadCrumb = async (path: string) => {
        setCurrentPath(path);
    };

    return (
        <>
            <Body>
                <SubtleButton onClick={clickBackToBuckets}>
                    <LuArrowLeft />
                    Lista de Buckets
                </SubtleButton>

                <HStack>
                    <BucketHeading bucket={bucket} />
                    <Spacer />

                    {/* <Button disabled onClick={clickedNewBucket}>
                        <LuPlus /> Novo Bucket
                    </Button> */}
                </HStack>
                <HStack>
                    <Breadcrumb
                        rootName={isShowingDirectories ? "Raíz" : "Todos os Aquivos"}
                        path={currentPath}
                        onClickPath={clickBreadCrumb}
                    />
                    <Spacer />

                    {isShowingDirectories ? (
                        <SimpleIconButton tooltip="Ver todos os documentos" onClick={seeFilesOnly}>
                            <LuFile />
                        </SimpleIconButton>
                    ) : (
                        <SimpleIconButton tooltip="Ver árvore de diretórios" onClick={seeDirectories}>
                            <LuFolderTree />
                        </SimpleIconButton>
                    )}

                    <SubtleButton onClick={clickedRefresh} disabled={isLoading}>
                        <LuRefreshCw /> Atualizar
                    </SubtleButton>

                    <SimpleButton onClick={clickedUpload}>
                        <LuUpload /> Upload
                    </SimpleButton>
                </HStack>

                <ExplorerGrid mt="10px" isLoading={isLoading} loadingFailed={isLoadFailed} eWidth={"90px"}>
                    {objects.elements.map((obj: BucketObject, index) => {
                        return obj.kind === "dir" ? (
                            <DirectoryCard
                                bucketObject={obj}
                                onClick={() => clickDirectory(obj)}
                                key={`directoryCard#${index}`}
                            />
                        ) : (
                            <FileCard bucketObject={obj} key={`FileCard#${index}`} />
                        );
                    })}
                </ExplorerGrid>

                <NewFileDrawer
                    isOpen={open}
                    onClose={clickedCloseFileUpload}
                    onOpen={clickedUpload}
                    path={currentPath}
                />
            </Body>
        </>
    );
}
