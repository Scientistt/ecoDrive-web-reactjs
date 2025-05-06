import { callAPI } from "utils";

export const listBuckets = async (filter = {}, pagination = { limit: 10, page: 1 }) => {
    const response = await callAPI({
        method: "POST",
        url: `/buckets`,
        data: { filter: filter, pagination: pagination }
    });
    return response?.body?.bucket || { elements: [] };
};

export const getBucket = async (bucketName = "my-bucket") => {
    const response = await callAPI({
        method: "GET",
        url: `/bucket/${bucketName}`,
        data: {}
    });
    return response?.body?.bucket || {};
};
