import axios from "axios";
import { APIResponseType } from "types";
import { getStorage } from "utils";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    timeout: parseInt(process.env.NEXT_PUBLIC_API_CALL_TIMEOUT || "60000")
});

api.interceptors.request.use(
    (config) => {
        try {
            const token = getStorage("usrtkn");

            if (token && !config.headers["Authorization"]) {
                config.headers["Authorization"] = `${token}`;
            }
        } catch {
            //
        } finally {
            return config;
        }
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // if (error.response) {
        //   const { status, data } = error.response;

        //   // Exemplo de tratamento de erros globais
        //   if (status === 401) {
        //
        //     // redirecionar para login ou limpar token
        //   } else if (status === 403) {
        //
        //   } else if (status === 500) {
        //
        //   }

        //   // Você pode usar bibliotecas como react-toastify aqui
        //
        // } else {
        //
        // }

        return Promise.reject(error); // Permite tratar individualmente, se quiser
    }
);

export const callAPI = async ({
    method = "GET",
    url = "/",
    data = {},
    params = {},
    headers = {}
}): Promise<APIResponseType> => {
    return await api.request({
        method,
        url,
        data,
        params,
        headers
    });
};

export default api;
