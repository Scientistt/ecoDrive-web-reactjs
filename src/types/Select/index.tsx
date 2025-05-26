import { /*type SelectRootProps, */ type SelectItemProps } from "@chakra-ui/react";
import { AWSStorageClass } from "types";

export interface AWSStorageClassSelectProps {
    onChangeValue?: (item: AWSStorageClass) => void;
}

export interface AWSStorageClassSelectItemProps extends SelectItemProps {
    storageClass: AWSStorageClass;
}
