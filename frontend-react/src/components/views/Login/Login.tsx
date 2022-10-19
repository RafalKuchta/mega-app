import React, {useState} from "react";

import './Login.css'

import {toast, ToastContainer} from "react-toastify";
import {getAxiosData} from "../../common/Axios-api/Axios.api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router";

export const Login = ({setIsLogined}: any) => {
    const [passwordType, setPasswordType] = useState("password");
    const [{email, pwd}, setCredentials] = useState({
        email: "test@test.pl",
        pwd: "1234",
    })
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('')
        const response = await getAxiosData({
            email,
            pwd,
            url: "/auth/login",
            method: "POST",
        });

        if (response.ok) {
            setIsLogined({
                isLogined: response.ok,
                email: response.email,
            });
            navigate('/sms', {replace: true})
        }

        if (response && response.error) {
            setError(response.error)
            toast.error('Login lub hasło są błędne!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar'
            });
        }
    }

    const togglePassword =()=>{
        if(passwordType==="password")
        {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <>
            <h2 className="login">Zaloguj</h2>
            <form className="login-form" onSubmit={login}>
                <div className='div-email-input'>
                    <input
                        type="email"
                        placeholder="Email: testowy: test@test.pl"
                        onChange={(e) => setCredentials({
                            email: e.target.value,
                            pwd,
                        })}
                    />
                </div>

                <div className="login-form--input-pass">
                    <input
                        type={passwordType}
                        placeholder="Hasło: testowe:1234"
                        onChange={(e) => setCredentials({
                            email,
                            pwd: e.target.value,
                        })}
                    />
                    <div className="div-icon-faEye">
                        <FontAwesomeIcon
                            icon={passwordType==="password" ? faEye : faEyeSlash}
                            className="icon-faEye"
                            onClick={togglePassword}
                        />
                    </div>

                </div>

                <div className="login-submit">
                    <button type="submit">Zaloguj</button>
                </div>
                {error.length > 0 && <ToastContainer autoClose={5000}/>}
            </form>

        </>
    );
};
