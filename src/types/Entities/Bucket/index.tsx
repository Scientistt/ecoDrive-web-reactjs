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

export interface BucketContextType {
    bucket: Bucket;
    setBucket: (bucket: Bucket) => void;
}

export interface BucketObject {
    kind: string;
    bucket: string;
    key?: string;
    name: string;
    ext?: string;
    full_name?: string;
    path?: string;
    size: number;
    tier: string;
    updated_at: Date;
    _token?: string;
    icon?: StaticImageData;
    restore?: {
        status?: string;
        is_restoring?: boolean;
        is_restored?: boolean;
        available_until?: Date;
    };
}
