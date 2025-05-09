import { setCookie } from "nookies";

type CreateParams = {
    key: string;
    value: string;
};

export function createCookie({ key, value }: CreateParams): string | null {
    if (!key || !value) return null;

    setCookie(undefined, key, value, {
        maxAge: 60 * 60 * 24 * 30 * 12,
        path: "/"
    });

    return value;
}
