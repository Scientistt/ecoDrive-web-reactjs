import type { StaticImageData } from "next/image";

export interface AWSRegion {
    name: string;
    key: string;
    icon: StaticImageData;
    color: string;
    description: string;
}
export interface AWSStorageClass {
    key: string;
    bgColor: string;
    color: string;
    name: string;
    description: string;
    icon?: StaticImageData;
}
