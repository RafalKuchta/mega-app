import {createContext} from "react";

export const LoadingContext = createContext({
    loading: false,
    setLoading: (s: boolean) => {},
})