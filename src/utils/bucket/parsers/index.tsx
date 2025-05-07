import { Bucket } from "types";
import { bucketIcons } from "assets";

export const getBucketTagFields = (bucket: Bucket): Bucket => {
    const newBucket: Bucket = { name: bucket.name };
    newBucket.tag_name = bucket.name;
    newBucket.description = undefined;
    newBucket.icon = undefined;
    for (let i = 0; i < (bucket.tags?.length || 0); i++) {
        if (bucket.tags?.[i]?.key === "name") newBucket.tag_name = bucket.tags[i].value;
        if (bucket.tags?.[i]?.key === "description") newBucket.description = bucket.tags[i].value;
        if (bucket.tags?.[i]?.key === "icon") newBucket.icon = bucketIcons[bucket.tags[i].value] || bucketIcons.default;
    }
    return newBucket;
};
