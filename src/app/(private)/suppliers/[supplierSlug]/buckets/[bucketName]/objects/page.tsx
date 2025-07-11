"use client";

import { useEffect, useState } from "react";
import { listBucketObjects, requestObjectRestore, getBucketObject } from "endpoints";
import { toast } from "react-toastify";
import {
    getViewableObjectProperties,
    isObjectReadyToBeDownloaded,
    parseDateDistance,
    getStorage,
    NEXT_LOCALE_TOKEN_NAME
} from "utils";
import {
    LuDownload,
    LuShare2,
    LuHeart,
    LuWrench,
    LuCloudDownload,
    LuTextCursorInput,
    LuLoader,
    LuFolderOpen
} from "react-icons/lu";
import { useTranslations } from "next-intl";
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
    const t = useTranslations("Objects");
    const locale = getStorage(NEXT_LOCALE_TOKEN_NAME) || "pt";
    const tFileContextMenu = useTranslations("FileContextMenu");
    const tDirectoryContextMenu = useTranslations("DirectoryContextMenu");
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
        setSelectedObjectKey(obj.key);
    };
    const clickFile = async (obj: BucketObject) => {
        setSelectedObjectKey(obj.key);
    };

    const doubleClickDirectory = async (obj: BucketObject) => {
        setCurrentPath(obj.name);
    };

    const doubleClickFile = async (obj: BucketObject) => {
        toast.loading(`Abrir o drawer ${obj.name}`, {
            position: "bottom-right",
            closeOnClick: true,
            type: "error",
            pauseOnHover: true,
            draggable: true,
            isLoading: false,
            autoClose: 5000,
            theme: "colored"
        });
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
                title: tFileContextMenu("view"),
                value: "view",
                onClick: () => {
                    handleObjectDownloadRequest(obj);
                },
                icon: viewableObject.icon,
                disabled: !downloadable
            }); // view

        items.push({
            title: tFileContextMenu("download", {
                until:
                    downloadable && obj?.restore?.status === "RESTORED"
                        ? ` (${tFileContextMenu("downloadAvailableEnds")} ${parseDateDistance(obj?.restore?.available_until || "", locale)})`
                        : ""
            }),
            // titlex: `${tFileContextMenu('view')}${downloadable && obj?.restore?.status === "RESTORED" ? ` (até ${parseDateDistance(obj?.restore?.available_until || "")})` : ""}`,
            value: "download",
            onClick: () => {
                handleObjectDownloadRequest(obj);
            },
            icon: <LuDownload />,
            disabled: !downloadable
        }); // dowload

        if (!downloadable && obj?.restore?.status !== "RESTORED")
            items.push({
                title:
                    obj?.restore?.status === "RESTORING" ? tFileContextMenu("restoring") : tFileContextMenu("restore"),
                value: "restore",
                onClick: () => {
                    handleObjectRestoreRequest(obj);
                },
                icon: obj?.restore?.status === "RESTORING" ? <LuLoader /> : <LuCloudDownload />,
                disabled: obj?.restore?.status !== "UNAVAILABLE"
            }); // restore

        items.push({
            title: tFileContextMenu("share"),
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
            title: tFileContextMenu("addToFavorites"),
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
            title: tFileContextMenu("move"),
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
            title: tFileContextMenu("copyPath"),
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
            title: tFileContextMenu("rename"),
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
            title: tFileContextMenu("delete"),
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
            title: tFileContextMenu("properties"),
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

    const handleDirectoryContextMenu = (e: React.MouseEvent, obj: BucketObject) => {
        const items = [];

        items.push({
            title: tDirectoryContextMenu("open"),
            value: "open",
            onClick: () => {
                doubleClickDirectory(obj);
            },
            icon: <LuFolderOpen />
        }); // open

        items.push({
            title: tDirectoryContextMenu("share"),
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
            title: tDirectoryContextMenu("addToFavorites"),
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
            title: tDirectoryContextMenu("move"),
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
            title: tDirectoryContextMenu("copyPath"),
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
            title: tDirectoryContextMenu("rename"),
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
            title: tDirectoryContextMenu("delete"),
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
            title: tDirectoryContextMenu("properties"),
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
                    {t("backToBuckets")}
                </SubtleButton>
                <HStack>
                    <BucketHeading bucket={bucket} />
                    <Spacer />
                </HStack>
                <HStack>
                    <Breadcrumb
                        rootName={isShowingDirectories ? t("root") : t("allObjects")}
                        path={currentPath}
                        onClickPath={clickBreadCrumb}
                    />
                    <Spacer />

                    {isShowingDirectories ? (
                        <SimpleIconButton tooltip={t("seeAllObjects")} onClick={seeFilesOnly}>
                            <LuFile />
                        </SimpleIconButton>
                    ) : (
                        <SimpleIconButton tooltip={t("seeAsDirectoryTree")} onClick={seeDirectories}>
                            <LuFolderTree />
                        </SimpleIconButton>
                    )}

                    <SubtleButton onClick={clickedRefresh} disabled={isLoading}>
                        <LuRefreshCw /> {t("update")}
                    </SubtleButton>

                    <SimpleButton onClick={clickedUpload}>
                        <LuUpload /> {t("newObject")}
                    </SimpleButton>
                </HStack>

                <ExplorerGrid mt="10px" isLoading={isLoading} loadingFailed={isLoadFailed} eWidth={"90px"}>
                    {objects.elements.map((obj: BucketObject, index) => {
                        return obj.kind === "dir" ? (
                            <DirectoryCard
                                tabIndex={index + 1}
                                _focus={{ outline: "none" }}
                                onFocus={() => {
                                    setSelectedObjectKey(obj.key);
                                }}
                                isSelected={selectedObjectKey === obj.key}
                                bucketObject={obj}
                                key={`directoryCard#${index}`}
                                onContextMenu={(e) => {
                                    handleDirectoryContextMenu(e, obj);
                                }}
                                onClick={() => clickDirectory(obj)}
                                onDoubleClick={() => doubleClickDirectory(obj)}
                            />
                        ) : (
                            <FileCard
                                tabIndex={index + 1}
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
                                onClick={() => clickFile(obj)}
                                onDoubleClick={() => doubleClickFile(obj)}
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
