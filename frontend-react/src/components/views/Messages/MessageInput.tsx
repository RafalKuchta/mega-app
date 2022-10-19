import React, {useContext, useState} from 'react';
import {LoadingContext} from "../../../context/loading.context";
import {getAxiosData} from "../../common/Axios-api/Axios.api";

export const MessageInput = ({send}: { send: (value: string) => void}) => {
    const {loading, setLoading} = useContext(LoadingContext);
    const [value, setValue] = useState("");

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await getAxiosData({
            message: value,
            url: "/chat",
            method: "POST",
        });

        setValue("");
    }

    return (
        <>
            <form className="input-message" onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Wpisz wiadomość..."
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    required
                />
                <button onClick={() => send(value)}>Wyślij</button>
            </form>
        </>
    )
}