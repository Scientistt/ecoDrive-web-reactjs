import { callAPI } from "utils";

export const checkAuthToken = async (jwt: string) => {
    const response = await callAPI({
        method: "GET",
        url: `/is-auth`,
        headers: { Authorization: jwt }
    });
    return response?.body?.user || null;
};

export const login = async (login: string, password: string) => {
    const response = await callAPI({
        method: "POST",
        url: `/login`,
        data: { login, password, keep: true }
    });
    return response?.body?.user?.id ? { user: response?.body?.user, token: response?.body?.token } : null;
};
