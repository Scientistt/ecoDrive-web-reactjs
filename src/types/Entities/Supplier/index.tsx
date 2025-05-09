import type { StaticImageData } from "next/image";
export interface Supplier {
    id: bigint;
    slug: string;
    name: string;
    description?: string;
    status: string;
    account_supplier: string;
    icon?: StaticImageData;
}

export interface SupplierContextType {
    supplier: Supplier;
    setSupplier: (supplier: Supplier) => void;
}
