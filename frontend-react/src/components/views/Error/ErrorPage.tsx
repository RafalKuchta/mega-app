import React from 'react';
import {useNavigate} from "react-router";

import './ErrorPage.css';

export const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <h2>Nie znaleziono strony :(</h2>
            <button onClick={() => navigate('/sms', {replace: true})} >Powrót do strony głównej</button>
        </div>

    )
}