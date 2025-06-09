import type { StaticImageData } from "next/image";

import oracle_logo_light from "assets/images/oracle/identity/oracle_light.svg";
import oracle_logo_dark from "assets/images/oracle/identity/oracle_dark.svg";

export const oracle: Record<string, StaticImageData> = {
    logo_light: oracle_logo_light,
    logo_dark: oracle_logo_dark
};
