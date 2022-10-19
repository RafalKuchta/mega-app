export class CreateSmDto {
    name: string;
    surname: string;
    company: string;
    position: string;
    phone: string;
    group: string;
}

export class CreateSmsDto {
    name: string;
    surname: string;
    company: string;
    group: string;
    mobile_number?: string;
    message: string;
    phones?: [{
        phone: string,
        id: string,
    }];
    groups?: [{
        group: string,
        id: string,
    }];
}

