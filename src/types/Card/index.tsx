import { type CardRootProps, type StackProps } from "@chakra-ui/react";
import { Bucket, BucketObject, Supplier } from "types";

export interface BucketCardProps extends CardRootProps {
    bucket: Bucket;
    loadDetails: boolean;
}

export interface BucketHeadingProps extends CardRootProps {
    bucket: Bucket;
}

export interface BucketObjectProps extends StackProps {
    bucketObject: BucketObject;
    isSelected: boolean;
}

export interface SupplierCardProps extends StackProps {
    supplier: Supplier;
}
