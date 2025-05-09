import { createCookie, deleteCookie, getCookie } from "../cookie";

export function getStorage(key: string | undefined): string | null {
    if (!key) return null;
    return getCookie(key);
}

export function setStorage(key: string, value: string): string | null {
    if (!key && !value) return null;
    return createCookie({ key, value });
}

export function deleteStorage(key: string | undefined): string | null {
    if (!key) return null;
    return deleteCookie(key);
}
