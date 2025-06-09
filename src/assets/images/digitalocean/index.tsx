import type { StaticImageData } from "next/image";

import digitalOcean_logo_light from "assets/images/digitalocean/identity/digitalocean.svg";
import digitalOcean_logo_dark from "assets/images/digitalocean/identity/digitalocean.svg";

export const digitalOcean: Record<string, StaticImageData> = {
    logo_light: digitalOcean_logo_light,
    logo_dark: digitalOcean_logo_dark
};
