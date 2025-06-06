"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { listSuppliers } from "endpoints";
import { Supplier } from "types";
import { useContextMenu } from "contexts";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Body, PageHeading, ExplorerGrid, SupplierCard, SimpleButton, SubtleButton, Loading } from "components";
import { toast } from "react-toastify";
import { HStack, VStack, Spacer, Box, Highlight } from "@chakra-ui/react";
import { LuRefreshCw, LuPlus, LuFolderOpen, LuArrowUpDown, LuTable, LuCheck, LuList, LuInfo } from "react-icons/lu";

const PAGE_SIZE = 2;

export default function Buckets() {
    const t = useTranslations("Credentials");
    const tFileContextMenu = useTranslations("CredentialBGContextMenu");

    const router = useRouter();

    const contextMenu = useContextMenu();

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadFailed, setIsLoadFailed] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [suppliersTotalCount, setSuppliersTotalCount] = useState(0);
    const [selectedSupplierId, setSelectedSupplierId] = useState<bigint>(0n);

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const loadSuppliersList = useCallback(async (pageToLoad: number) => {
        if (isLoading || !hasMore) {
            return;
        }

        console.log(`loading page ${pageToLoad}`);

        setIsLoading(true);
        setIsLoadFailed(false);

        try {
            const filter = {};
            const pagination = {
                limit: PAGE_SIZE,
                page: pageToLoad,
                sort: {
                    by: sortBy,
                    order: sortOrder
                }
            };

            const objs = await listSuppliers(filter, pagination);
            const total = objs?.totalElements ?? 0;
            const newElements = objs?.elements ?? [];

            setSuppliers((prev) => [...prev, ...newElements]);
            console.log(`loaded page ${pageToLoad}`);
            setSuppliersTotalCount(total);
            setHasMore(pageToLoad * PAGE_SIZE < total);
        } catch {
            setIsLoadFailed(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMore && !isLoading) {
                setPage((prev) => prev + 1);
            }
        });

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
    }, [hasMore, isLoading]);

    useEffect(() => {
        loadSuppliersList(page);
    }, [page]);

    const clickedRefresh = () => {
        setHasMore(false);
        setPage(1);
        setSuppliers([]);
    };

    const clickedNewSupplier = async () => {
        toast.loading(`Criação de Credenciais ainda não disponível`, {
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

    const clickSupplier = async (supplier: Supplier) => {
        setSelectedSupplierId(supplier.id);
    };

    const doubleClickSupplier = async (supplier: Supplier) => {
        router.push(`/suppliers/${supplier.slug}/buckets`);
    };

    const handleBGContextMenu = (e: React.MouseEvent) => {
        const items = [];

        items.push({
            title: tFileContextMenu("viewAs"),
            value: "view",
            icon: <LuTable />,
            onClick: () => {},
            items: [
                {
                    title: tFileContextMenu("viewAsCard"),
                    value: "viewAsCard",
                    onClick: () => {
                        toast.loading(`Alterar tipo de visualização para CARD ainda não disponível`, {
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
                    icon: <LuTable />
                },
                {
                    title: tFileContextMenu("viewAsList"),
                    value: "viewAsList",
                    onClick: () => {
                        toast.loading(`Alterar tipo de visualização para LISTA ainda não disponível`, {
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
                    icon: <LuList />
                }
            ]
        }); // open

        items.push({
            title: tFileContextMenu("newCredential"),
            value: "open",
            onClick: () => {
                clickedNewSupplier();
            },
            icon: <LuPlus />
        }); // open

        items.push({
            title: tFileContextMenu("reload"),
            value: "share",
            onClick: () => {
                clickedRefresh();
            },
            icon: <LuRefreshCw />
        }); //reload

        items.push({
            title: tFileContextMenu("sortBy"),
            value: "sort",
            onClick: () => {
                clickedRefresh();
            },
            icon: <LuArrowUpDown />,
            items: [
                {
                    title: tFileContextMenu("sortById"),
                    value: "sortById",
                    onClick: () => {
                        setSortBy("id");
                        clickedRefresh();
                    },
                    icon: sortBy === "id" ? <LuCheck /> : <></>
                },
                {
                    title: tFileContextMenu("sortByDate"),
                    value: "sortByDate",
                    onClick: () => {
                        setSortBy("created_at");
                        clickedRefresh();
                    },
                    icon: sortBy === "created_at" ? <LuCheck /> : <></>
                },
                {
                    title: tFileContextMenu("sortByName"),
                    value: "sortByName",
                    onClick: () => {
                        setSortBy("name");
                        clickedRefresh();
                    },
                    icon: sortBy === "name" ? <LuCheck /> : <></>
                },
                {
                    title: tFileContextMenu("sortByDescription"),
                    value: "sortByDescription",
                    onClick: () => {
                        setSortBy("description");
                        clickedRefresh();
                    },
                    icon: sortBy === "description" ? <LuCheck /> : <></>
                },
                {
                    title: tFileContextMenu("sortBySupplier"),
                    value: "sortBySupplier",
                    onClick: () => {
                        setSortBy("account_supplier");
                        clickedRefresh();
                    },
                    icon: sortBy === "account_supplier" ? <LuCheck /> : <></>
                },
                {
                    divider: true
                },
                {
                    title: tFileContextMenu("sortByAsc"),
                    value: "sortByAsc",
                    onClick: () => {
                        setSortOrder("asc");
                        clickedRefresh();
                    },
                    icon: sortOrder === "asc" ? <LuCheck /> : <></>
                },
                {
                    title: tFileContextMenu("sortByDesc"),
                    value: "sortByDesc",
                    onClick: () => {
                        setSortOrder("desc");
                        clickedRefresh();
                    },
                    icon: sortOrder === "desc" ? <LuCheck /> : <></>
                }
            ]
        }); //sort

        items.push({
            title: tFileContextMenu("about"),
            value: "about",
            onClick: () => {
                toast.loading(`Página SOBRE ainda não disponível`, {
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
            icon: <LuInfo />
        }); //about

        contextMenu.setEntity?.(null);
        contextMenu.setMenu?.({ items });
        contextMenu.clickHandler?.(e);
    };

    const handleSupplierContextMenu = (e: React.MouseEvent, sup: Supplier) => {
        e.stopPropagation();
        const items = [];

        items.push({
            title: "Open",
            value: "open",
            onClick: () => {
                clickedNewSupplier();
            },
            icon: <LuFolderOpen />
        }); // open

        // items.push({
        //     title: tDirectoryContextMenu("share"),
        //     value: "share",
        //     onClick: () => {
        //         toast.loading(`Compartilhar ${obj.name}`, {
        //             position: "bottom-right",
        //             closeOnClick: true,
        //             type: "error",
        //             pauseOnHover: true,
        //             draggable: true,
        //             isLoading: false,
        //             autoClose: 5000,
        //             theme: "colored"
        //         });
        //     },
        //     icon: <LuShare2 />
        // }); //share

        // items.push({
        //     title: tDirectoryContextMenu("addToFavorites"),
        //     value: "favorite",
        //     onClick: () => {
        //         toast.loading(`Favoritar ${obj.name}`, {
        //             position: "bottom-right",
        //             closeOnClick: true,
        //             type: "error",
        //             pauseOnHover: true,
        //             draggable: true,
        //             isLoading: false,
        //             autoClose: 5000,
        //             theme: "colored"
        //         });
        //     },
        //     icon: <LuHeart />
        // }); // favorite

        // items.push({
        //     divider: true
        // });

        // items.push({
        //     title: tDirectoryContextMenu("move"),
        //     value: "move",
        //     onClick: () => {
        //         toast.loading(`Mover ${obj.name}`, {
        //             position: "bottom-right",
        //             closeOnClick: true,
        //             type: "error",
        //             pauseOnHover: true,
        //             draggable: true,
        //             isLoading: false,
        //             autoClose: 5000,
        //             theme: "colored"
        //         });
        //     }
        // }); // move

        // items.push({
        //     title: tDirectoryContextMenu("copyPath"),
        //     value: "copy_path",
        //     onClick: () => {
        //         toast.loading(`Copiar ${obj.name}`, {
        //             position: "bottom-right",
        //             closeOnClick: true,
        //             type: "error",
        //             pauseOnHover: true,
        //             draggable: true,
        //             isLoading: false,
        //             autoClose: 5000,
        //             theme: "colored"
        //         });
        //     },
        //     command: "Ctrl+C"
        // }); // copy

        // items.push({
        //     divider: true
        // });

        // items.push({
        //     title: tDirectoryContextMenu("rename"),
        //     value: "rename",
        //     onClick: () => {
        //         toast.loading(`Renomear ${obj.name}`, {
        //             position: "bottom-right",
        //             closeOnClick: true,
        //             type: "error",
        //             pauseOnHover: true,
        //             draggable: true,
        //             isLoading: false,
        //             autoClose: 5000,
        //             theme: "colored"
        //         });
        //     },
        //     icon: <LuTextCursorInput />
        // }); // rename

        // items.push({
        //     title: tDirectoryContextMenu("delete"),
        //     value: "delete",
        //     onClick: () => {
        //         toast.loading(`Deletar ${obj.name}`, {
        //             position: "bottom-right",
        //             closeOnClick: true,
        //             type: "error",
        //             pauseOnHover: true,
        //             draggable: true,
        //             isLoading: false,
        //             autoClose: 5000,
        //             theme: "colored"
        //         });
        //     },
        //     danger: true
        // }); // delete

        // items.push({
        //     divider: true
        // });

        // items.push({
        //     title: tDirectoryContextMenu("properties"),
        //     value: "properties",
        //     onClick: () => {
        //         toast.loading(`Acessar propriedades ${obj.name}`, {
        //             position: "bottom-right",
        //             closeOnClick: true,
        //             type: "error",
        //             pauseOnHover: true,
        //             draggable: true,
        //             isLoading: false,
        //             autoClose: 5000,
        //             theme: "colored"
        //         });
        //     },
        //     icon: <LuWrench />
        // }); // properties

        contextMenu.setEntity?.(sup);
        contextMenu.setMenu?.({ items });
        contextMenu.clickHandler?.(e);
    };

    return (
        <>
            <Body>
                <VStack pb={"10px"} onContextMenu={handleBGContextMenu}>
                    <HStack w={"100%"}>
                        <PageHeading header={t("title")} description={t("description")} />
                        <Spacer />
                        <SubtleButton onClick={clickedRefresh} disabled={isLoading}>
                            <LuRefreshCw /> {t("update")}
                        </SubtleButton>
                        <SimpleButton onClick={clickedNewSupplier}>
                            <LuPlus /> {t("newCredential")}
                        </SimpleButton>
                    </HStack>
                    <HStack align={"center"} w={"100%"} mt={"-20px"}>
                        <HStack fontStyle={"italic"}>
                            {suppliers.length === suppliersTotalCount ? (
                                <Highlight query={suppliersTotalCount.toString()} styles={{ fontWeight: "semibold" }}>
                                    {t("ShowingAllSuppliers", { total: suppliersTotalCount })}
                                </Highlight>
                            ) : (
                                <Highlight
                                    query={[suppliersTotalCount.toString(), suppliers.length.toString()]}
                                    styles={{ fontWeight: "semibold" }}
                                >
                                    {t("ShowingXSuppliersOfYTotal", {
                                        showing: suppliers.length,
                                        total: suppliersTotalCount
                                    })}
                                </Highlight>
                            )}
                        </HStack>
                    </HStack>
                </VStack>
                <ExplorerGrid
                    isLoading={false}
                    loadingFailed={isLoadFailed}
                    eWidth={"400px"}
                    onContextMenu={handleBGContextMenu}
                >
                    {suppliers.map((obj: Supplier, index) => {
                        return (
                            <SupplierCard
                                supplier={obj}
                                key={`supplierCard#${index}`}
                                tabIndex={index + 1}
                                _focus={{ outline: "none" }}
                                onFocus={() => {
                                    setSelectedSupplierId(obj.id);
                                }}
                                isSelected={selectedSupplierId === obj.id}
                                onContextMenu={(e) => {
                                    handleSupplierContextMenu(e, obj);
                                }}
                                onClick={() => clickSupplier(obj)}
                                onDoubleClick={() => doubleClickSupplier(obj)}
                            />
                        );
                    })}
                </ExplorerGrid>

                <Box ref={sentinelRef} height="40px" mt="10px" onContextMenu={handleBGContextMenu}>
                    <Loading
                        messageLoading={t("loadingCredentials")}
                        isLoading={isLoading}
                        messageLoaded={t("loadedCredentials")}
                        hasLoaded={!hasMore}
                    />
                </Box>
            </Body>
        </>
    );
}
