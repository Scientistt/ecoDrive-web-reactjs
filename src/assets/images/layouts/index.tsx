import type { StaticImageData } from "next/image";

import failed_loading from "assets/images/layouts/load/failed_loading.png";

import bg_test from "assets/images/layouts/bg/bg-pesado.jpeg";
import bg_test_dark from "assets/images/layouts/bg/bg-pesado-dark.jpg";

import eco_drive_logo from "assets/images/layouts/identity/ecoDrive.png";

export const LoadingIcons: Record<string, StaticImageData> = {
    failed: failed_loading
};

export const bgImages: Record<string, StaticImageData> = {
    dev: bg_test,
    dev_dark: bg_test_dark
};

export const ecoDrive: Record<string, StaticImageData> = {
    logo: eco_drive_logo
};
