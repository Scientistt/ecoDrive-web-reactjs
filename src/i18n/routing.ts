import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "pt", "es", "zh", "ja"],
    defaultLocale: "pt",
    localePrefix: "always"
});
