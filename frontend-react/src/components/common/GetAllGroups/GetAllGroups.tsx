import React from 'react';
import {getFetchData} from "../Fetch-api/Fetch-api";

export const GetAllGroups = async () => {
    const res = await getFetchData({
        url: '/sms/groups/get-all',
        method: 'GET',
    })
    return await res.json();

}