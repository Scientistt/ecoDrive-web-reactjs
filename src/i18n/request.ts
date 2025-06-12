import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import deepmerge from "deepmerge";
// import { NEXT_LOCALE_TOKEN_NAME } from "utils";

export default getRequestConfig(async () => {
    const cookieStore = await cookies();

    const locale = cookieStore.get("NEXT_LOCALE")?.value || "pt";
    const messages = (await import(`../../messages/${locale}.json`)).default;
    const messagesEn = (await import(`../../messages/en.json`)).default;

    return {
        locale,
        // messages: messages
        messages: deepmerge(messagesEn, messages)
    };
});
