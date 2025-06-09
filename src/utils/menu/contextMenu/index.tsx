import { BucketObject } from "types";
import {
    LuFileImage,
    LuFileQuestion,
    LuFileVideo,
    LuFileMusic,
    LuFileText,
    LuFileJson,
    LuFileCode
} from "react-icons/lu";
import { ReactNode } from "react";

import { parseFilePath } from "utils";

const viewableExtensions: Record<string, ReactNode> = {
    png: <LuFileImage />,
    jpg: <LuFileImage />,
    jpeg: <LuFileImage />,

    mp3: <LuFileMusic />,

    mp4: <LuFileVideo />,
    mov: <LuFileVideo />,

    pdf: <LuFileText />,

    txt: <LuFileText />,

    json: <LuFileJson />,
    html: <LuFileCode />,
    css: <LuFileCode />,

    unknown: <LuFileQuestion />
};

export const getViewableObjectProperties = (object: BucketObject) => {
    const obj = parseFilePath(object);

    if (`${obj.ext?.toLowerCase()}` in viewableExtensions)
        return {
            visible: true,
            icon: viewableExtensions[`${obj.ext?.toLowerCase()}`]
        };

    return {
        visible: false,
        icon: viewableExtensions.unknown
    };
};
