import { memo } from "react";
import { VStack, Heading, Badge } from "@chakra-ui/react";

import { NewBucketDrawerProps } from "types";
import { Drawer } from "components";

const NewBucketDrawer = (props: NewBucketDrawerProps) => {
    const isOpen = !!props.isOpen;
    const onClose = props.onClose ? props.onClose : () => {};

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title={"Novo Bucket"}
            body={
                <>
                    <VStack gap={"10px"} p={"10px"}>
                        <Heading size="6xl">new Bucket</Heading>
                        <Badge colorPalette="green">Removed</Badge>
                    </VStack>
                </>
            }
        />
    );
};

export default memo(NewBucketDrawer);
