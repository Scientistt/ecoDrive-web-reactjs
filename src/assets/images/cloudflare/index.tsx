import type { StaticImageData } from "next/image";

import cloudflare_logo_light from "assets/images/cloudflare/identity/cloudflare_light.svg";
import cloudflare_logo_dark from "assets/images/cloudflare/identity/cloudflare_dark.svg";

export const cloudflare: Record<string, StaticImageData> = {
    logo_light: cloudflare_logo_light,
    logo_dark: cloudflare_logo_dark
};
