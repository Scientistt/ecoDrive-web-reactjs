import { BucketObject } from "types";

export const isObjectReadyToBeDownloaded = (obj: BucketObject): boolean => {
    if (obj.tier === "STANDARD") return true;
    if (obj.tier === "DEEP_ARCHIVE" && obj.restore?.status === "RESTORED") return true;

    return false;
};
