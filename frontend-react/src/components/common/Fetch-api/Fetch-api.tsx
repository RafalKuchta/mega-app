import {apiUrl} from "../../../config/api";

export interface Data {
    id?: string;
    url: string;
    method: string;
    body?: string;
}

export const getFetchData = async (data: Data) => {
    return await fetch(`${apiUrl}${data.url}`, {
        method: data.method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': `${apiUrl}:3001`,
        },
        referrerPolicy: 'no-referrer',
        credentials: 'include',
        mode: 'cors',
        body: data.body
    });
}

export const getFetchDataId = async (data: Data) => {
    return await fetch(`${apiUrl}${data.url}${data.id}`, {
        method: data.method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': `${apiUrl}:3001`,
        },
        referrerPolicy: 'no-referrer',
        credentials: 'include',
        mode: 'cors',
        body: data.body
    });
}


