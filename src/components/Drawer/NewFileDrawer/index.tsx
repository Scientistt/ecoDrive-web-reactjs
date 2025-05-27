"use client";
import { memo, useEffect, useState, useRef } from "react";
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
    Highlight
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { AWSStorageClass, NewFileDrawerProps } from "types";
import { Drawer, SimpleButton, SimpleCancelButton, toaster, AWSStorageClassSelect } from "components";

import { useFileUploadContext } from "@chakra-ui/react";

import dropFileBgImage from "assets/images/layouts/bg/drop-file-bgimage.svg";

const InjectDroppedFileToContext = ({ file }: { file?: File }) => {
    const { setFiles } = useFileUploadContext();

    useEffect(() => {
        if (file) {
            setTimeout(() => {
                setFiles([file]);
            }, 100);
        }
    }, [file, setFiles]);

    return null;
};

const NewFileDrawer = (props: NewFileDrawerProps) => {
    const isOpen = !!props.isOpen;
    const onClose = props.onClose ? props.onClose : () => {};
    const onOpen = props.onOpen ? props.onOpen : () => {};
    const path = props.path ? props.path : "";

    const [selectedStorageClass, setSelectedStorageClass] = useState("standard");
    const [isDragging, setIsDragging] = useState(false);
    const [droppedFile, setDroppedFile] = useState<File | null>(null);
    // const { acceptedFiles } = useFileUploadContext();

    const overlayRef = useRef<HTMLDivElement>(null);
    const inputFileNameRef = useRef<HTMLInputElement>(null);

    const submitFiles = () => {
        const pathPart = path === "Raiz" ? "" : path; // se o path for 'Raiz', não adiciona nada
        // const file = acceptedFiles?.[0];

        const fileName = inputFileNameRef.current?.value?.trim();
        // nome default para o arquivo

        toaster.create({
            type: "error",
            title: "Funcionalidade não disponível",
            description: `Storage: ${selectedStorageClass}\nPath: ${pathPart}\nNome do arquivo: ${fileName}\nDropped File: ${droppedFile?.name}`
        });

        // const formData = new FormData();
        // formData.append("file", file);
        // formData.append("fileName", fileName);
        // formData.append("storageClass", selectedStorageClass?.toString()); // ou selectedStorageClass.name, conforme sua API
        // formData.append("path", path); // se quiser enviar o path atual também
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
                setDroppedFile(files[0]);
                console.log("Arquivo solto:", files[0]);
                console.log("droppedFile:", droppedFile);
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
                                Solte o arquivo aqui
                            </Heading>
                            <Text color="white" fontSize={"md"} fontWeight={"light"}>
                                Max 200GB
                            </Text>
                        </VStack>
                    </Center>
                </Box>
            ) : null}

            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                title={"Upload de Arquivos"}
                body={
                    <VStack gap={"10px"} p={"10px"} align={"left"}>
                        <AWSStorageClassSelect onChangeValue={onChangeStorageClassSelect} />

                        <Heading size={"sm"} letterSpacing="tight" pt={"10px"}>
                            Diretório:{" "}
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

                        <FileUpload.Root maxW="100%" alignItems="stretch">
                            {/* Aqui injetamos o arquivo assim que o contexto estiver montado */}
                            {/* <SetarArquivoInicial file={startingFile} /> */}
                            {droppedFile && <InjectDroppedFileToContext file={droppedFile} />}
                            <FileUpload.HiddenInput />
                            <FileUpload.Dropzone>
                                <Icon as={LuUpload} boxSize="5" color="fg.muted" />
                                <FileUpload.DropzoneContent>
                                    <Box>Clique para procurar ou Arraste o arquivo até aqui</Box>
                                    <Box color="fg.muted">Tamanho máximo de 1TB</Box>
                                </FileUpload.DropzoneContent>
                            </FileUpload.Dropzone>
                            <FileUpload.List />
                        </FileUpload.Root>
                    </VStack>
                }
                footer={
                    <HStack gap={"10px"}>
                        <SimpleCancelButton onClick={onClose}>
                            <Text>Cancelar</Text>
                        </SimpleCancelButton>

                        <SimpleButton onClick={submitFiles}>
                            <Text>Salvar</Text>
                        </SimpleButton>
                    </HStack>
                }
            />
        </>
    );
};

export default memo(NewFileDrawer);
