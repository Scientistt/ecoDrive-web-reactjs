import { destroyCookie } from "nookies";

export function deleteCookie(key: string) {
    destroyCookie(null, key, {
        path: "/"
    });
    return null;
}
