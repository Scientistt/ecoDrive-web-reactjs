"use client";
import { memo, useEffect } from "react";
import { VStack, HStack, FileUpload, Icon, Box, Text, Input, InputGroup } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { AWSStorageClass, NewFileDrawerProps } from "types";
import { Drawer, SimpleButton, SimpleCancelButton, toaster, AWSStorageClassSelect } from "components";
import { useFileUploadContext } from "@chakra-ui/react";

const SetarArquivoInicial = ({ file }: { file?: File }) => {
    const { setFiles } = useFileUploadContext();

    useEffect(() => {
        if (file) {
            setTimeout(() => {
                setFiles([file]);
            }, 100); // pequeno delay para garantir montagem do contexto
        }
    }, [file, setFiles]);

    return null;
};

const NewFileDrawer = (props: NewFileDrawerProps) => {
    const isOpen = !!props.isOpen;
    const onClose = props.onClose ? props.onClose : () => {};
    const path = props.path ? props.path : "";
    const startingFile = props.file ? props.file : undefined;

    const submitFiles = () => {
        toaster.create({
            type: "error",
            title: "Funcionalidade não disponível",
            description:
                "Estamos trabalhando para que seja possível recuperar a senha em breve, por hora: Fale com o suporte"
        });
    };

    const onChangeStorageClassSelect = (item: AWSStorageClass) => {
        console.log("Mudou o storage class", item.name);
    };

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title={"Upload de Arquivos"}
            body={
                <VStack gap={"10px"} p={"10px"} align={"left"}>
                    <AWSStorageClassSelect onChangeValue={onChangeStorageClassSelect} />

                    <InputGroup startElement={`${path}`} startElementProps={{ color: "fg.muted" }}>
                        <Input placeholder="nome" />
                    </InputGroup>

                    <FileUpload.Root maxW="100%" alignItems="stretch">
                        {/* Aqui injetamos o arquivo assim que o contexto estiver montado */}
                        <SetarArquivoInicial file={startingFile} />

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
    );
};

export default memo(NewFileDrawer);
