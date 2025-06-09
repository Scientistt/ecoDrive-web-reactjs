// rtl-cache.ts
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

export const rtlCache = createCache({
    key: "chakra-rtl",
    stylisPlugins: [rtlPlugin]
});
