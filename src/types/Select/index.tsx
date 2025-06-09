import { /*type SelectRootProps, */ type SelectItemProps } from "@chakra-ui/react";
import { AWSStorageClass, AccountSupplier } from "types";

export interface AWSStorageClassSelectProps {
    onChangeValue?: (item: AWSStorageClass) => void;
}

export interface AWSStorageClassSelectItemProps extends SelectItemProps {
    storageClass: AWSStorageClass;
}

export interface AccountSupplierProps {
    onChangeValue?: (item: AccountSupplier) => void;
    required?: boolean;
    label?: string;
}

export interface AccountSupplierItemProps extends SelectItemProps {
    accountSupplier: AccountSupplier;
}
