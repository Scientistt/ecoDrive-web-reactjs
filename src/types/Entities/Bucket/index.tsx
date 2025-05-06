import type { StaticImageData } from "next/image";
export interface Bucket {
    name: string;
    tag_name?: string;
    description?: string;
    created_at?: Date;
    region?: string;
    tags?: { key: string; value: string }[];
    icon?: StaticImageData;
}
