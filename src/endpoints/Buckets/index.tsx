import { callAPI } from "utils";
import { Supplier } from "types";

export const listBuckets = async (supplier: Supplier, filter = {}, pagination = { limit: 10, page: 1 }) => {
    console.log("Filter: ", { filter: filter, pagination: pagination });
    const response = await callAPI({
        method: "POST",
        url: `/supplier/${supplier.id}/buckets`,
        data: { filter: filter, pagination: pagination }
    });
    return response?.body?.bucket || { elements: [] };
};

export const getBucket = async (supplier: Supplier, bucketName = "my-bucket") => {
    const response = await callAPI({
        method: "GET",
        url: `/supplier/${supplier.id}/bucket/${bucketName}`,
        data: {}
    });
    return response?.body?.bucket || {};
};
