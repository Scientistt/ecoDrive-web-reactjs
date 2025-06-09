"use client";

import { memo, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
    VStack,
    HStack,
    FileUpload,
    Icon,
    Box,
    Text,
    Input,
    InputGroup,
    Center,
    Image,
    Heading,
    Highlight,
    useFileUpload
} from "@chakra-ui/react";

import { LuUpload } from "react-icons/lu";
import { AWSStorageClass, NewFileDrawerProps } from "types";
import { Drawer, SimpleButton, SimpleCancelButton, AWSStorageClassSelect } from "components";
import { uploadSingleObject } from "endpoints";

import dropFileBgImage from "assets/images/layouts/bg/drop-file-bgimage.svg";

const NewFileDrawer = (props: NewFileDrawerProps) => {
    const t = useTranslations("newFileDrawer");
    const isOpen = !!props.isOpen;
    const onClose = props.onClose ? props.onClose : () => {};
    const onOpen = props.onOpen ? props.onOpen : () => {};
    const onUpload = props.onUpload ? props.onUpload : () => {};
    const path = props.path ? props.path : "";

    const [selectedStorageClass, setSelectedStorageClass] = useState("standard");

    const [isDragging, setIsDragging] = useState(false);

    // const { acceptedFiles } = useFileUploadContext();

    const fileUpload = useFileUpload();

    const overlayRef = useRef<HTMLDivElement>(null);
    const inputFileNameRef = useRef<HTMLInputElement>(null);

    const submitFiles = async () => {
        const pathPart = path === "Raiz" ? "" : path; // se o path for 'Raiz', não adiciona nada

        const fileName = inputFileNameRef.current?.value?.trim() || fileUpload.acceptedFiles[0].name;
        const file = fileUpload.acceptedFiles[0];

        // const toastId = toast.loading("Enviando arquivo...");
        const toastId = toast.loading(t("uploading"), {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            type: "info",
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
        onClose();

        try {
            const object = await uploadSingleObject({
                supplier: props.supplier,
                bucket: props.bucket,
                file: file,
                name: `${pathPart}${fileName}`,
                storageClass: selectedStorageClass
            });

            if (object?.name) {
                toast.update(toastId, {
                    render: t("uploadingDone"),
                    type: "success",
                    isLoading: false,
                    autoClose: 5000,
                    closeButton: true
                });
                onUpload();
            } else {
                toast.update(toastId, {
                    render: t("uploadingFailed"),
                    type: "error",
                    isLoading: false,
                    autoClose: 5000,
                    closeButton: true
                });
            }
        } catch {
            toast.update(toastId, {
                render: "Não foi possível concluir o upload!",
                type: "error",
                isLoading: false,
                autoClose: 5000,
                closeButton: true
            });
        }
    };

    const onChangeStorageClassSelect = (item: AWSStorageClass) => {
        setSelectedStorageClass(item.key);
    };

    // file dropping logic
    useEffect(() => {
        let dragCounter = 0;

        const handleDragEnter = (e: DragEvent) => {
            e.preventDefault();
            dragCounter++;
            setIsDragging(true);
            onClose();
        };

        const handleDragLeave = (e: DragEvent) => {
            e.preventDefault();
            dragCounter--;

            if (overlayRef.current && overlayRef.current.contains(e.relatedTarget as Node)) return;

            if (dragCounter <= 0) setIsDragging(false);
        };

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            dragCounter = 0;
            setIsDragging(false);

            const files = e.dataTransfer?.files;

            if (files && files.length > 0) {
                fileUpload.acceptedFiles.pop();
                fileUpload.acceptedFiles.push(files[0]);
                onOpen();
            }
        };

        const target = document;

        target.addEventListener("dragenter", handleDragEnter);
        target.addEventListener("dragleave", handleDragLeave);
        target.addEventListener("dragover", handleDragOver);
        target.addEventListener("drop", handleDrop);

        return () => {
            target.removeEventListener("dragenter", handleDragEnter);
            target.removeEventListener("dragleave", handleDragLeave);
            target.removeEventListener("dragover", handleDragOver);
            target.removeEventListener("drop", handleDrop);
        };
    }, [onOpen]);

    return (
        <>
            {isDragging ? (
                <Box
                    ref={overlayRef}
                    position="fixed"
                    top={"50px"}
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex={1400} // maior que quase tudo do Chakra
                    bg="rgba(0, 0, 0, 0.3)" // um leve escurecimento
                    backdropFilter="blur(8px)" // o blur principal
                    backdropBlur="8px" // redundância para navegadores diferentes
                >
                    <Center w="100%" h="100%">
                        <VStack>
                            <Image src={dropFileBgImage.src} w={"200px"} alt="Solte os arquivos aqui" pb={"20px"} />
                            <Heading fontSize="3xl" color="white">
                                {t("dropTheFileHereTitle")}
                            </Heading>
                            <Text color="white" fontSize={"md"} fontWeight={"light"}>
                                {t("dropTheFileHereDescription")}
                            </Text>
                        </VStack>
                    </Center>
                </Box>
            ) : null}

            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                title={t("drawerTitle")}
                body={
                    <VStack gap={"10px"} p={"10px"} align={"left"}>
                        <AWSStorageClassSelect onChangeValue={onChangeStorageClassSelect} />

                        <Heading size={"sm"} letterSpacing="tight" pt={"10px"}>
                            {t("directory")}:{" "}
                            {path ? (
                                <Highlight
                                    query={path}
                                    styles={{ px: "2", py: "1", bg: { base: "green.200", _dark: "green.700" } }}
                                >
                                    {path}
                                </Highlight>
                            ) : (
                                "Raiz"
                            )}
                        </Heading>
                        <InputGroup>
                            <Input placeholder="Nome do arquivo" ref={inputFileNameRef} />
                        </InputGroup>

                        <FileUpload.RootProvider value={fileUpload} maxW="100%" alignItems="stretch">
                            <FileUpload.HiddenInput />
                            <FileUpload.Dropzone>
                                <Icon as={LuUpload} boxSize="5" color="fg.muted" />
                                <FileUpload.DropzoneContent>
                                    <Box>{t("clickToSearchFileTitle")}</Box>
                                    <Box color="fg.muted">{t("clickToSearchFileDescription")}</Box>
                                </FileUpload.DropzoneContent>
                            </FileUpload.Dropzone>
                            {/* <FileUpload.List /> */}
                            <FileUpload.ItemGroup>
                                <FileUpload.Context>
                                    {({ acceptedFiles }) =>
                                        acceptedFiles.map((file) => (
                                            <FileUpload.Item key={file.name} file={file}>
                                                <FileUpload.ItemPreview />
                                                <FileUpload.ItemName />
                                                <FileUpload.ItemSizeText />
                                                <FileUpload.ItemDeleteTrigger />
                                            </FileUpload.Item>
                                        ))
                                    }
                                </FileUpload.Context>
                            </FileUpload.ItemGroup>
                        </FileUpload.RootProvider>
                    </VStack>
                }
                footer={
                    <HStack gap={"10px"}>
                        <SimpleCancelButton onClick={onClose}>
                            <Text>{t("cancel")}</Text>
                        </SimpleCancelButton>

                        <SimpleButton onClick={submitFiles}>
                            <Text>{t("save")}</Text>
                        </SimpleButton>
                    </HStack>
                }
            />
        </>
    );
};

export default memo(NewFileDrawer);
