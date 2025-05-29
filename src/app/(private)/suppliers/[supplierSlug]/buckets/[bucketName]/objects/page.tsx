"use client";

import { useEffect, useState } from "react";
import { listBucketObjects, requestObjectRestore, getBucketObject } from "endpoints";
import { toast } from "react-toastify";
import { getViewableObjectProperties, isObjectReadyToBeDownloaded } from "utils";
import { LuDownload, LuShare2, LuHeart, LuWrench, LuCloudDownload, LuTextCursorInput, LuLoader } from "react-icons/lu";

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
import { useBucket, useSupplier, useContextMenu } from "contexts";
import { useRouter } from "next/navigation";
import { BucketObject } from "types";

export default function BucketObjects() {
    const router = useRouter();

    const { bucket } = useBucket();
    const { supplier } = useSupplier();
    const contextMenu = useContextMenu();

    const newFileDrawer = useDisclosure();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadFailed, setIsLoadFailed] = useState(false);
    const [currentPath, setCurrentPath] = useState("");
    const [lastKnownPath, setLastKnownPath] = useState("");

    const [isShowingDirectories, setIsShowingDirectories] = useState(true);
    const [objects, setObjects] = useState({ elements: [], totalElements: 0 });
    const [selectedObjectKey, setSelectedObjectKey] = useState("");

    const loadBucketObjects = async (soft = false) => {
        if (!soft) {
            setIsLoading(true);
        }
        setSelectedObjectKey("");
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

    const softReloadBucketObjects = async () => {
        loadBucketObjects(true);
    };

    const handleObjectRestoreRequest = async (object: BucketObject) => {
        const toastId = toast.loading(`Solicitando restauração do arquivo ${object.name}`, {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            type: "info",
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
        try {
            await requestObjectRestore({
                supplier,
                bucket,
                object,
                days: 2,
                tier: "Bulk"
            });

            toast.update(toastId, {
                render: "Solicitação feita! Seu arquivo ficará disponível para download em até 72h",
                type: "success",
                isLoading: false,
                autoClose: 5000,
                closeButton: true
            });
        } catch {
            toast.update(toastId, {
                render: "Não foi possível concluir a solicitação!",
                type: "error",
                isLoading: false,
                autoClose: 5000,
                closeButton: true
            });
        } finally {
        }
    };

    const handleObjectDownloadRequest = async (object: BucketObject) => {
        const toastId = toast.loading(`Baixando o arquivo ${object.name}`, {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            type: "info",
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
        try {
            const obj = await getBucketObject(supplier, bucket, object.key);

            //
            window.open(obj.url, "_blank");

            toast.update(toastId, {
                render: "Seu download começará em instantes",
                type: "success",
                isLoading: false,
                autoClose: 5000,
                closeButton: true
            });
        } catch {
            toast.update(toastId, {
                render: "Download indisponível",
                type: "error",
                isLoading: false,
                autoClose: 5000,
                closeButton: true
            });
        } finally {
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
        newFileDrawer.onOpen();
    };

    const clickedCloseFileUpload = async () => {
        newFileDrawer.onClose();
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

    const handleFileContextMenu = (e: React.MouseEvent, obj: BucketObject) => {
        const items = [];

        const viewableObject = getViewableObjectProperties(obj);
        const downloadable = isObjectReadyToBeDownloaded(obj);

        if (viewableObject.visible)
            items.push({
                title: "Visualizar",
                value: "view",
                onClick: () => {
                    handleObjectDownloadRequest(obj);
                },
                icon: viewableObject.icon,
                disabled: !downloadable
            }); // view

        items.push({
            title: "Download",
            value: "download",
            onClick: () => {
                handleObjectDownloadRequest(obj);
            },
            icon: <LuDownload />,
            disabled: !downloadable
        }); // dowload

        if (!downloadable && obj?.restore?.status !== "RESTORED")
            items.push({
                title: obj?.restore?.status === "RESTORING" ? "Restaurando..." : "Solicitar Restauração",
                value: "restore",
                onClick: () => {
                    handleObjectRestoreRequest(obj);
                },
                icon: obj?.restore?.status === "RESTORING" ? <LuLoader /> : <LuCloudDownload />,
                disabled: obj?.restore?.status !== "UNAVAILABLE"
            }); // restore

        items.push({
            title: "Compartilhar",
            value: "share",
            onClick: () => {
                toast.loading(`Compartilhar ${obj.name}`, {
                    position: "bottom-right",
                    closeOnClick: true,
                    type: "error",
                    pauseOnHover: true,
                    draggable: true,
                    isLoading: false,
                    autoClose: 5000,
                    theme: "colored"
                });
            },
            icon: <LuShare2 />
        }); //share

        items.push({
            title: "Favoritar",
            value: "favorite",
            onClick: () => {
                toast.loading(`Favoritar ${obj.name}`, {
                    position: "bottom-right",
                    closeOnClick: true,
                    type: "error",
                    pauseOnHover: true,
                    draggable: true,
                    isLoading: false,
                    autoClose: 5000,
                    theme: "colored"
                });
            },
            icon: <LuHeart />
        }); // favorite

        items.push({
            divider: true
        });

        items.push({
            title: "Mover",
            value: "move",
            onClick: () => {
                toast.loading(`Mover ${obj.name}`, {
                    position: "bottom-right",
                    closeOnClick: true,
                    type: "error",
                    pauseOnHover: true,
                    draggable: true,
                    isLoading: false,
                    autoClose: 5000,
                    theme: "colored"
                });
            }
        }); // move

        items.push({
            title: "Copiar Caminho",
            value: "copy_path",
            onClick: () => {
                toast.loading(`Copiar ${obj.name}`, {
                    position: "bottom-right",
                    closeOnClick: true,
                    type: "error",
                    pauseOnHover: true,
                    draggable: true,
                    isLoading: false,
                    autoClose: 5000,
                    theme: "colored"
                });
            },
            command: "Ctrl+C"
        }); // copy

        items.push({
            divider: true
        });

        items.push({
            title: "Renomear",
            value: "rename",
            onClick: () => {
                toast.loading(`Renomear ${obj.name}`, {
                    position: "bottom-right",
                    closeOnClick: true,
                    type: "error",
                    pauseOnHover: true,
                    draggable: true,
                    isLoading: false,
                    autoClose: 5000,
                    theme: "colored"
                });
            },
            icon: <LuTextCursorInput />
        }); // rename

        items.push({
            title: "Deletar",
            value: "delete",
            onClick: () => {
                toast.loading(`Deletar ${obj.name}`, {
                    position: "bottom-right",
                    closeOnClick: true,
                    type: "error",
                    pauseOnHover: true,
                    draggable: true,
                    isLoading: false,
                    autoClose: 5000,
                    theme: "colored"
                });
            },
            danger: true
        }); // delete

        items.push({
            divider: true
        });

        items.push({
            title: "Propriedades",
            value: "properties",
            onClick: () => {
                toast.loading(`Acessar propriedades ${obj.name}`, {
                    position: "bottom-right",
                    closeOnClick: true,
                    type: "error",
                    pauseOnHover: true,
                    draggable: true,
                    isLoading: false,
                    autoClose: 5000,
                    theme: "colored"
                });
            },
            icon: <LuWrench />
        }); // properties

        contextMenu.setEntity?.(obj);
        contextMenu.setMenu?.({ items });
        contextMenu.clickHandler?.(e);
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
                                isSelected={selectedObjectKey === obj.key}
                                bucketObject={obj}
                                onClick={() => clickDirectory(obj)}
                                key={`directoryCard#${index}`}
                            />
                        ) : (
                            <FileCard
                                tabIndex={index}
                                _focus={{ outline: "none" }}
                                onFocus={() => {
                                    setSelectedObjectKey(obj.key);
                                }}
                                isSelected={selectedObjectKey === obj.key}
                                bucketObject={obj}
                                key={`FileCard#${index}`}
                                onContextMenu={(e) => {
                                    handleFileContextMenu(e, obj);
                                }}
                                onClick={() => {
                                    setSelectedObjectKey(obj.key);
                                }}
                                onDoubleClick={() => {
                                    alert(`Abrir drawer para o arquivo: ${obj.name}`);
                                }}
                            />
                        );
                    })}
                </ExplorerGrid>

                <NewFileDrawer
                    isOpen={newFileDrawer.open}
                    onClose={clickedCloseFileUpload}
                    onOpen={clickedUpload}
                    onUpload={softReloadBucketObjects}
                    bucket={bucket}
                    supplier={supplier}
                    path={currentPath}
                />
            </Body>
        </>
    );
}
