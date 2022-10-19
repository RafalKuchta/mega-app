import React, {useContext, useEffect, useRef, useState} from 'react';
import './Messages.css';
import {LoadingContext} from "../../../context/loading.context";
import {UserContext} from "../../../context/message.context";
import {getAxiosData} from "../../common/Axios-api/Axios.api";

interface ChatEntity {
    id: string;
    message: string;
    user: string;
    created_at: string;
}

export const Messages = ({message}: { message: string[] }) => {
    const {loading, setLoading} = useContext(LoadingContext);
    const {user, setUser} = useContext(UserContext);
    const [messages, setMessages] = useState<ChatEntity[]>([]);

    const bottomRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            const response = await getAxiosData({
                url: "/chat",
                method: "GET",
            });
            setMessages(response);
        })();
        setLoading(false);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages, message]);

    return (
        <div className="messages-page">
            <div>
                {
                    messages.map(message => (
                        <div className={message.user === user ? "message-chat-inside" : "message-chat-outside"}
                             key={message.id}>
                            <p className={message.user === user ? "message-chat--user-inside" : "message-chat--user-outside"}>{message.user}:</p>
                            <div
                                className={message.user === user ? "message-chat--time-inside" : "message-chat--time-outside"}>
                                <p>{message.message}</p>
                                <p className={message.user === user ? "message--time-inside" : "message--time-outside"}>{message.created_at.slice(11, 19)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    message.map((mess, i) => (
                        <div className={mess[1] === user ? "message-chat-inside" : "message-chat-outside"} key={i}>
                            <p className={mess[1] === user ? "message-chat--user-inside" : "message-chat--user-outside"}>{mess[1]}:</p>
                            <div
                                className={mess[1] === user ? "message-chat--time-inside" : "message-chat--time-outside"}>
                                <p>{mess[0]}</p>
                                <p className={mess[0] === user ? "message--time-inside" : "message--time-outside"}>{mess[2]}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div ref={bottomRef}/>
        </div>

    )
}