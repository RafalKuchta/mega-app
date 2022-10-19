import {createContext} from "react";

export const PhonesContext = createContext({
    phones: [{
        id: '',
        phone: '',
        company: '',
        name: '',
        surname: '',
    }],
    setPhones: (phones: any) => {},
});