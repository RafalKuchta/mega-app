import Axios, {AxiosRequestConfig} from "axios";
import {apiUrl} from "../../../config/api";

export interface  Data {
    message: string;
}

export const onGetMessages = async () => {
    const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': `${apiUrl}`,
        },
        url: `${apiUrl}/chat`,
        withCredentials: true,
    }

    try {
        const {data: response} = await Axios.request(requestConfig);
        return response;
    } catch (e) {
        console.error(e)
        return {error: (e as Error).message}
    }

}

export const onSendMessage = async (data: Data) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': `${apiUrl}`,
        },
        withCredentials: true,
        url: `${apiUrl}/chat`,
        data,
    }

    try {
        const {data: response} = await Axios.request(requestConfig);
        return response;
    } catch (e) {
        console.error(e)
        return {error: (e as Error).message}
    }

}

