import Axios, {AxiosRequestConfig} from "axios";
import {apiUrl} from "../../../config/api";

export interface Credentials {
    email?: string;
    pwd?: string;
    message?: string;
    url?: string;
    method?: string;
    body?: string;
}


export const getAxiosData = async (data: Credentials) => {
    const requestConfig: AxiosRequestConfig = {
        method: data.method,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': `${apiUrl}`,
        },
        url: `${apiUrl}${data.url}`,
        withCredentials: true,
        data,
    }

    try {
        const {data: response} = await Axios.request(requestConfig);
        return response;
    } catch (e) {
        return {error: (e as Error).message}
    }
}


