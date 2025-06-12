import { memo } from "react";
import { Dialog, Portal, CloseButton } from "@chakra-ui/react";
import { DialogProps } from "types";

const SimpleDialog = (props: DialogProps) => {
    const isOpen = !!props.isOpen;
    const onClose = props.onClose
        ? props.onClose
        : () => {
              console.log("Nao pode ser");
          };

    return (
        <Dialog.Root role="alertdialog" open={isOpen} onOpenChange={onClose}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{props.title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>{props.body}</Dialog.Body>
                        <Dialog.Footer>{props.footer}</Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default memo(SimpleDialog);

/**
   return (
        <Dialog.Root open={isOpen} onOpenChange={onClose} size="md" placement="end">
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content display="flex" flexDirection="column" maxH="100vh">
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

                        <Dialog.Footer mt="auto" py={"10px"}>
                            <Spacer />
                            {props.footer}
                        </Dialog.Footer>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );

 */
