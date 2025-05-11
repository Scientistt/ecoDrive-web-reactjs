import { callAPI } from "utils";

// export const checkAuthToken = async (jwt: string) => {
//     const response = await callAPI({
//         method: "GET",
//         url: `/is-auth`,
//         headers: { Authorization: jwt }
//     });
//     return response?.body?.user || null;
// };

export const register = async (voucher: string, name: string, login: string, password: string, email: string) => {
    const response = await callAPI({
        method: "POST",
        url: `/account`,
        data: { login, password, voucher, name, email, sex: "N" }
    });
    return response;
};
export const validateRegisterVoucher = async (voucher: string) => {
    const response = await callAPI({
        method: "POST",
        url: `/account/validate/voucher`,
        data: { voucher }
    });

    return response?.header?.http === 200;
};

export const validateRegisterEmail = async (email: string) => {
    const response = await callAPI({
        method: "POST",
        url: `/account/validate/email`,
        data: { email }
    });

    return response?.header?.http === 200;
};

export const validateRegisterUserName = async (login: string) => {
    const response = await callAPI({
        method: "POST",
        url: `/account/validate/login`,
        data: { login }
    });

    return response?.header?.http === 200;
};
