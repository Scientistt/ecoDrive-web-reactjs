import type { StaticImageData } from "next/image";

export interface AWSRegion {
    name: string;
    key: string;
    icon: StaticImageData;
    color: string;
    description: string;
}
