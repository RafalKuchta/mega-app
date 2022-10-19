import React, {useContext, useState} from 'react';

import './Register.css';
import {getAxiosData} from "../../common/Axios-api/Axios.api";
import {Toast} from "../../common/Toast/Toast";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router";
import {LoadingContext} from "../../../context/loading.context";


export const Register = () => {
    const {loading, setLoading} = useContext(LoadingContext);
    const [{email, pwd, repeatPwd}, setRegisterData] = useState({
        email: '',
        pwd: '',
        repeatPwd: '',
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const register = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        setError('');

        if( pwd === repeatPwd){
            const response = await getAxiosData({
                email,
                pwd,
              url: "/user/register",
              method: "POST",
            })

            if (response.error === "Request failed with status code 409") {
                response.error = "Użytkownik już istnieje."
            } else {
                Toast(`Uzytkownik ${email} dodany do bazy.`);
                setRegisterData({
                    email: '',
                    pwd: '',
                    repeatPwd: '',
                });
            }

            if(response && response.error){
                setError(response.error)
            }

        } else {
            setError("Oba hasła muszą być takie same!")
        }
    };


    return (
        <>
            <h2 className="register">Rejestracja użytkownika</h2>
            <ToastContainer autoClose={2000}/>
            <form className="register-form" onSubmit={register}>
                <input
                    value={email}
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setRegisterData({
                        email: e.target.value,
                        pwd,
                        repeatPwd,
                    })}
                    required
                />
                <input
                    value={pwd}
                    type="password"
                    name="pwd"
                    placeholder="Hasło"
                    onChange={(e) => setRegisterData({
                        email,
                        pwd: e.target.value,
                        repeatPwd,
                    })}
                    required
                />
                <input
                    value={repeatPwd}
                    type="password"
                    name="pwd"
                    placeholder="Powtórz hasło"
                    onChange={(e) => setRegisterData({
                        email,
                        pwd,
                        repeatPwd: e.target.value,
                    })}
                    required
                />
                <button type="submit">Zapisz</button>
                {error.length > 0 && <p>{error}</p>}
                <button onClick={() => navigate('/sms', {replace: true})}>Powrót do strony głównej</button>
            </form>
        </>

    )
};