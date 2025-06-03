import { setStorage, NEXT_LOCALE_TOKEN_NAME } from "utils";

export async function setUserLocale(locale: string) {
    setStorage(NEXT_LOCALE_TOKEN_NAME, locale);
}
