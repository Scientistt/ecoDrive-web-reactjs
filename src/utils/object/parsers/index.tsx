import { BucketObject } from "types";
import { FileExtensionIcons, FileDirectoryIcons } from "assets";

export const parseFilePath = (bucketObject: BucketObject): BucketObject => {
    const newObj: BucketObject = { ...bucketObject, full_name: bucketObject.name };

    const parts = newObj.name.split("/");
    const fileName = parts.pop();
    const path = parts.join("/");

    let ext = null;
    let name = fileName;
    const nameParts = fileName?.split(".");

    if (Array.isArray(nameParts) && nameParts.length > 1) {
        ext = nameParts.pop();
        name = nameParts.join(".");
    }
    newObj.path = `${path}`;
    newObj.name = name || newObj.name;
    newObj.ext = ext || undefined;
    newObj.icon = FileExtensionIcons[ext || "blank"] || FileExtensionIcons.blank;

    return newObj;
};

export const parseDirectoryPath = (bucketObject: BucketObject): BucketObject => {
    const newObj: BucketObject = { ...bucketObject, full_name: bucketObject.name };

    const parts = newObj.name.split("/");
    parts.pop();

    newObj.path = `${parts.join("/")}`;
    newObj.name = parts.pop() || newObj.name;
    newObj.icon = FileDirectoryIcons.folder;

    return newObj;
};

export const parseObjectSize = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
