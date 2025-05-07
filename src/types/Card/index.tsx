import { type CardRootProps, type StackProps } from "@chakra-ui/react";
import { Bucket, BucketObject } from "types";

export interface BucketCardProps extends CardRootProps {
    bucketName: string;
}

export interface BucketHeadingProps extends CardRootProps {
    bucket: Bucket;
}
export interface BucketObjectProps extends StackProps {
    bucketObject: BucketObject;
}
