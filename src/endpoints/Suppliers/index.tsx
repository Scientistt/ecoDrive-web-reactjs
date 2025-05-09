import { callAPI } from "utils";

export const listSuppliers = async (filter = {}, pagination = { limit: 10, page: 1 }) => {
    const response = await callAPI({
        method: "POST",
        url: `/suppliers`,
        data: { filter: filter, pagination: pagination }
    });
    return response?.body?.supplier || { elements: [] };
};

export const getSupplier = async (supplierSlug = "my-sup") => {
    const response = await callAPI({
        method: "GET",
        url: `/supplier/${supplierSlug}`,
        data: {}
    });
    return response?.body?.supplier || {};
};
