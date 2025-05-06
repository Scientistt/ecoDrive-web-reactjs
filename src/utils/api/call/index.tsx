import axios from "axios";
import { APIResponseType } from "types";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    timeout: parseInt(process.env.NEXT_PUBLIC_API_CALL_TIMEOUT || "60000")
});

api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
        // }
        return config;
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
        //     console.error("Não autorizado.");
        //     // redirecionar para login ou limpar token
        //   } else if (status === 403) {
        //     console.error("Acesso negado.");
        //   } else if (status === 500) {
        //     console.error("Erro interno no servidor.");
        //   }

        //   // Você pode usar bibliotecas como react-toastify aqui
        //   console.error(data?.message || "Erro desconhecido.");
        // } else {
        //   console.error("Erro de conexão ou timeout.");
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
