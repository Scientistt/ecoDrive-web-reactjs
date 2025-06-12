import { memo } from "react";
import { Drawer, Portal, CloseButton, Heading, Box, Spacer, Text } from "@chakra-ui/react";
import { DrawerProps } from "types";

const SimpleDrawer = (props: DrawerProps) => {
    const isOpen = !!props.isOpen;
    const onClose = props.onClose
        ? props.onClose
        : () => {
              console.log("Nao pode ser");
          };

    return (
        <Drawer.Root open={isOpen} onOpenChange={onClose} size="md" placement="end">
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content display="flex" flexDirection="column" maxH="100vh">
                        <Box pt="20px" pl="10px" pb={"10px"}>
                            <Heading size="xl">{props.title}</Heading>
                            <Text>{props.subtitle}</Text>
                        </Box>

                        <Box
                            flex="1"
                            overflowY="auto"
                            p="10px"
                            bg={{ base: "gray.100", _dark: "gray.900" }}
                            borderTop={"1px solid #d1d5db"}
                            borderBottom={"1px solid #d1d5db"}
                        >
                            {props.body}
                        </Box>

                        <Drawer.Footer mt="auto" py={"10px"}>
                            <Spacer />
                            {props.footer}
                        </Drawer.Footer>

                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
};

export default memo(SimpleDrawer);

/**
 
{isFileInfoLoading ? (
                            <Text>Vai carregar, calma...</Text>
                        ) : !isFileValid ? (
                            <Text>Arquivo inválido...</Text>
                        ) : (
                            <>
                                <Drawer.Header>
                                    <Drawer.Title>Detalhes do Arquivo</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <HStack>
                                        <VStack>
                                            <Image
                                                width="90px"
                                                height="90px"
                                                src={getIconForFileExt(parseFilePath(fileInfo.name)).src}
                                                alt={fileInfo.name}
                                                borderRadius="md"
                                                objectFit="cover"
                                            />
                                        </VStack>

                                        <VStack position="relative" w="100%" textAlign="start" gap={0}>
                                            <HStack w="100%">
                                                <Text fontSize="sm" fontWeight="bold">
                                                    {parseFilePath(fileInfo.name).name}
                                                </Text>

                                       
                                                <Badge> {parseFilePath(fileInfo.name).ext}</Badge>
                                                <Spacer></Spacer>
                                                <Text fontSize="sm" fontWeight="normal" textAlign="center">
                                                    {formatSize(fileInfo.size)}
                                                </Text>
                                            </HStack>

                                            <HStack w="100%" mt="0px">
                                                <ToolTip content={fileInfo.name}>
                                                    <Text fontSize="sm" fontWeight="light" cursor="pointer">
                                                        {parseFilePath(fileInfo.name).path}/
                                                    </Text>
                                                </ToolTip>
                                                <Spacer></Spacer>
                                     
                                            </HStack>

                                            <HStack w="100%">
                                                <ToolTip content={fileInfo.contentType}>
                                                    <Text mt="5px" fontSize="sm" fontWeight="bold" cursor="pointer">
                                                        {getLegibleContentType(fileInfo.contentType)}
                                                    </Text>
                                                </ToolTip>
                                            </HStack>

                                            <HStack w="100%">
                                                <Text fontSize="sm" fontWeight="normal">
                                                    {getLegibleTimestamp(fileInfo.updated_at)}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>

                                    <HStack alignContent="center" alignItems="start" mt="20px">
                                        <BucketTierBadge tier={fileInfo.tier} />
                                    </HStack>

                                    <Text fontSize="sm" fontWeight="normal">
                                        {getLegibleTier(fileInfo.tier).description}
                                    </Text>

                                    <Text fontSize="sm" fontWeight="bold" cursor="pointer" mt="20px"></Text>

                                    {isRequestingRestore ? <Text>SOLICITANDOOOOOOOOOOOO</Text> : ``}

                            

                                    {fileInfo.restore.is_restoring ? (
                                        <>
                                            <HStack>
                                                <Spinner size="sm" mr="5px" />
                                                <Text fontSize="sm" fontWeight="bold">
                                                    Restauração em progresso
                                                </Text>
                                            </HStack>
                                            <Text fontSize="sm" fontWeight="normal">
                                                O Download ficará disponível assim que o processo de restauração for
                                                concluído
                                            </Text>
                                        </>
                                    ) : (
                                        ``
                                    )}

                                    {fileInfo.restore.is_restored ? (
                                        <>
                                            <HStack>
                                                <Text fontSize="sm" fontWeight="bold">
                                                    Baixe seu arquivo
                                                </Text>
                                            </HStack>
                                            <Text fontSize="sm" fontWeight="normal">
                                                Após {getLegibleTimestamp(fileInfo.restore.available_until)} o arquivo
                                                não estará mais dispnível e uma nova solicitação de resturação deverá
                                                ser feita
                                            </Text>
                                        </>
                                    ) : (
                                        ``
                                    )}

                                    <HStack space="5px">
                                        {getRestoreButton()}
                                        {getDownloadButton()}
                                    </HStack>

                                    {/* <Text>Bucket: {fileInfo.bucket}</Text>
                                    <Text>Nome: {fileInfo.name}</Text>
                                    <Text>Key: {fileInfo.key}</Text>
                                  
                                    <Text>url: {fileInfo.url}</Text>

                         
                                </Drawer.Body>
                            </>
                        )}



 */
