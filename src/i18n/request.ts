import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    console.log("A: ", await requestLocale);
    const requested = await requestLocale;
    console.log("requested: ", requested);
    console.log("hasLocale: ", hasLocale);
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
    console.log("routing.locales: ", routing.locales);
    console.log("routing.defaultLocale: ", routing.defaultLocale);
    console.log("locale: ", locale);
    const messages = (await import(`../../messages/${locale}.json`)).default;
    console.log("Messages: ", messages);
    return {
        locale,
        messages
    };
});
