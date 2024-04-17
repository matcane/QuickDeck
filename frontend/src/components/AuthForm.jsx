import { useState } from 'react';
import { sign_in, sign_up } from "../services/auth";
import { jwtDecode } from "jwt-decode";
import './AuthForm.css'

function AuthForm ({type}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const clear = () => {
        setUsername("");
        setPassword("");
        window.location.reload(false);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (type === "sign in") {
            const response = await sign_in(username, password);
            window.localStorage.clear();
            window.localStorage.setItem('access_token', response.access);
            window.localStorage.setItem('refresh_token', response.refresh);
            window.localStorage.setItem("isLogged", true);
            window.localStorage.setItem("view", "Dashboard");
            window.localStorage.setItem("username", jwtDecode(response.access).username);
            clear();
        }
        if (type === "sign up") {
            const response = await sign_up(username, password);
            clear();
        }
      };


    return(
        <>
            <form className='auth-form' onSubmit={e => handleOnSubmit(e)}>
                <label className='auth-form-label' htmlFor="email-login">Username</label>
                <input 
                    className='auth-form-input' 
                    type="text" 
                    name="login" 
                    id="email-login" 
                    required value={username} 
                    onChange={e => setUsername(e.target.value)}
                /> 
                <label className='auth-form-label' htmlFor="password-login">Password</label>
                <input 
                    className='auth-form-input' 
                    type="password" 
                    name='passowrd' 
                    id="password-login" 
                    required value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
            <button className='auth-form-button'>{type[0].toUpperCase() + type.slice(1)}</button>
            </form>
        </>
    )
}

export default AuthForm