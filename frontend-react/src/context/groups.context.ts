import {createContext} from "react";

export const GroupsContext = createContext({
    groups: [{
        id: '',
        group: ''
    }],
    setGroups: (groups: any) => {},
});