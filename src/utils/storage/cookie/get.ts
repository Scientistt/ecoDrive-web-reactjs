import { parseCookies } from "nookies";

export function getCookie(key: string) {
    const { [key]: value } = parseCookies();

    if (!value) return null;

    return value;
}
