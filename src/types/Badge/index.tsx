import { type BadgeProps } from "@chakra-ui/react";

export interface DateBadgeProps extends BadgeProps {
    date?: Date;
    startText?: string;
    endText?: string;
}
export interface AWSRegionBadgeProps extends BadgeProps {
    region?: string;
}
export interface TagsBadgeProps extends BadgeProps {
    tags?: { key: string; value: string }[];
}
