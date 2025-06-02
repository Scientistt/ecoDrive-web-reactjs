import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "pt", "de", "es", "zh", "ja", "fr", "hi", "ru", "ko", "it"],
    defaultLocale: "pt",
    localePrefix: "always"
});
