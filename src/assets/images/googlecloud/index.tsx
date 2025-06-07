import type { StaticImageData } from "next/image";

import googlecloud_logo_light from "assets/images/googlecloud/identity/googlecloud.svg";
import googlecloud_logo_dark from "assets/images/googlecloud/identity/googlecloud.svg";

export const googlecloud: Record<string, StaticImageData> = {
    logo_light: googlecloud_logo_light,
    logo_dark: googlecloud_logo_dark
};
