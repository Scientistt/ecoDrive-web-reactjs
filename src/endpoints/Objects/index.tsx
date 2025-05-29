import { callAPI } from "utils";
import { Bucket, BucketObject, Supplier } from "types";

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

export const getBucketObject = async (supplier: Supplier, bucket: Bucket, objectKey: string) => {
    const response = await callAPI({
        method: "GET",
        url: `/supplier/${supplier.id}/bucket/${bucket.name}/object/${objectKey}`
    });

    return response?.body?.object || { elements: [] };
};

type UploadSingleObjectParams = {
    supplier: Supplier;
    bucket: Bucket;
    file: File;
    name: string;
    storageClass: string;
};

export const uploadSingleObject = async (options: UploadSingleObjectParams) => {
    console.log("Vamos fazer upload de um arquivo");
    const formData = new FormData();
    formData.append("file", options.file);
    formData.append("name", options.name);
    formData.append("storage", options.storageClass);

    const response = await callAPI({
        method: "POST",
        url: `/supplier/${options.supplier.id}/bucket/${options.bucket.name}/object`,
        data: formData
    });
    console.log("response: ", response);
    return response?.body?.object || { elements: [] };
};

type RequestObjectRestoreParams = {
    supplier: Supplier;
    bucket: Bucket;
    object: BucketObject;

    days: number;
    tier: string;
};

export const requestObjectRestore = async (options: RequestObjectRestoreParams) => {
    const response = await callAPI({
        method: "POST",
        url: `/supplier/${options.supplier.id}/bucket/${options.bucket.name}/object/${options.object.key}/restore`,
        data: { days: options.days, tier: options.tier }
    });
    console.log("response: ", response);
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
