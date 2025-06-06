import { type GridProps, FlexProps, type StackProps, type UseDrawerProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Bucket, Supplier } from "types";

export interface ExplorerGridProps extends GridProps {
    isLoading: boolean;
    loadingFailed: boolean;
    eWidth: string;
}

export interface NavBarProps extends FlexProps {
    decoyProp?: string;
}
export interface LoadingProps extends StackProps {
    message?: string;

    messageLoading?: string;
    isLoading?: boolean;
    messageLoaded?: string;
    hasLoaded?: boolean;
}
export interface DrawerProps extends UseDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;

    body?: ReactNode;
    footer?: ReactNode;
    title?: string;
}

export interface NewFileDrawerProps extends DrawerProps {
    path?: string;
    bucket: Bucket;
    supplier: Supplier;
    onUpload: () => void;
    // file: File | null;
}
export interface NewBucketDrawerProps extends DrawerProps {
    oi?: string;
}
