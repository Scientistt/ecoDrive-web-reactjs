import type { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface AWSRegion {
    name: string;
    key: string;
    icon: StaticImageData;
    color: string;
    description: string;
}
export interface AWSStorageClass {
    key: string;
    bgColor: string | { base?: string; hover?: string; active?: string; _dark?: string };
    color: string;
    name: string;
    description: string;
    icon?: ReactNode;
}
