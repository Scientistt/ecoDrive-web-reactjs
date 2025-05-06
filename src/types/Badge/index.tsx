import { type BadgeProps } from "@chakra-ui/react";

export interface DateBadgeProps extends BadgeProps {
    date?: Date;
}
export interface AWSRegionBadgeProps extends BadgeProps {
    region?: string;
}
