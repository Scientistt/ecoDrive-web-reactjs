import { type CardRootProps } from "@chakra-ui/react";

export interface BucketCardProps extends CardRootProps {
    bucketName: string;
    key: string;
}
