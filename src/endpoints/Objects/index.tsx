import { callAPI } from "utils";
import { Bucket, Supplier } from "types";

export const listBucketObjects = async (
    supplier: Supplier,
    bucket: Bucket,
    filter = {},
    pagination = { limit: 10, page: 1 }
) => {
    const response = await callAPI({
        method: "POST",
        url: `/supplier/${supplier.id}/bucket/${bucket.name}/objects`,
        data: { filter: filter, pagination: pagination }
    });
    return response?.body?.object || { elements: [] };
};

// export const getBucket = async (bucketName = "my-bucket") => {
//     const response = await callAPI({
//         method: "GET",
//         url: `/bucket/${bucketName}`,
//         data: {}
//     });
//     return response?.body?.bucket || {};
// };
