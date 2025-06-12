import { CreationSupplier } from "types";
import { callAPI } from "utils";

export const validateSupplierSlug = async (id: string, slug: string) => {
    const response = await callAPI({
        method: "GET",
        url: `/supplier/${id}/validate/slug/${slug}`,
        data: {}
    });
    return response?.header?.http === 200;
};

export const createSupplier = async (data: CreationSupplier) => {
    const response = await callAPI({
        method: "POST",
        url: `/supplier`,
        data: data
    });
    return response?.body?.supplier || { elements: [], totalElements: 0 };
};

export const listSuppliers = async (filter = {}, pagination = { limit: 10, page: 1 }) => {
    const response = await callAPI({
        method: "POST",
        url: `/suppliers`,
        data: { filter: filter, pagination: pagination }
    });
    return response?.body?.supplier || { elements: [], totalElements: 0 };
};

export const getSupplier = async (supplierSlug = "my-sup") => {
    const response = await callAPI({
        method: "GET",
        url: `/supplier/${supplierSlug}`,
        data: {}
    });
    return response?.body?.supplier || {};
};

export const deleteSupplier = async (supplierId = "0") => {
    const response = await callAPI({
        method: "DELETE",
        url: `/supplier/${supplierId}`,
        data: {}
    });
    return response?.body?.supplier || {};
};
