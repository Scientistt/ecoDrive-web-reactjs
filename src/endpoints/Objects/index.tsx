import { callAPI } from "utils";

export const listBucketObjects = async (bucketName: string, filter = {}, pagination = { limit: 10, page: 1 }) => {
    const response = await callAPI({
        method: "POST",
        url: `/bucket/${bucketName}/objects`,
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
