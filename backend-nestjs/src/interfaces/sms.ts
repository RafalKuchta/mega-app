export interface AddSmsResponse {
    id: string;
    name: string;
    surname: string;
    company: string;
    position: string;
    phone: string;
    groups: {
        id: string,
        name: string,
    };
}

export interface SendGroupResponse {
    id: string;
    name: string;
}

export interface SendResponse {
    message: string;
}

export interface AddGroupResponse {
    id: string;
    name: string;
}