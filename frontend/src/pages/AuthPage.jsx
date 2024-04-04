import { useState } from 'react';
import AuthForm from "../components/AuthForm";
import './AuthPage.css'

function AuthPage() {
    const [activeForm, setActiveForm] = useState('Sign in');

    const toggleForm = (type) => {
        setActiveForm(type);
    };

    const renderForm = (type) => {
        return (
            <div className='form-display'>
                <h1 onMouseEnter={() => toggleForm(type)}>{type}</h1>
            </div>
        );
    };

    return (
        <div className='auth-block'>
            {activeForm === 'Sign in' ? <AuthForm type="sign in" /> : renderForm('Sign in')}
            {activeForm === 'Sign up' ? <AuthForm type="sign up" /> : renderForm('Sign up')}
        </div>
    );
}

export default AuthPage
