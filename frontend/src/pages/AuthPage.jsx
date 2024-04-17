import { useState } from 'react';
import AuthForm from "../components/AuthForm";
import './AuthPage.css'

function AuthPage() {
    const [displayForm, setDisplayFrom] = useState(false);
    const [activeForm, setActiveForm] = useState('Sign in');

    const toggleDisplayForm = () => {
        setDisplayFrom(!displayForm);
        scrollToBottom();
    };

    function scrollToBottom() {
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 0);
      }

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
        <>
                <header>
                    <div>
                    <h1>Welcome to QuickDeck - Your Flashcards creator</h1>
                    <h2>Whether you want to master a new language, prepare for an exam, or simply reinforce your knowledge, QuickDeck is the perfect tool for you!</h2>
                    </div>
                </header>
                <section id='features'>
                    <h1>Why QuickDeck?</h1>
                    <div>
                    <ul>
                        <li><h1>Smart Flashcards</h1></li>
                        <li><h1>Effective Learning</h1></li>
                    </ul>
                    <ul>
                        <li><h1>Accessible Anywhere</h1></li>
                        <li><h1>Community Support</h1></li>
                    </ul>
                    </div>
                </section>
                <section id='how-to'>
                    <div>
                    <h1>How Does It Work?</h1>
                    <ol>
                        <li><h1>Create deck</h1></li>
                        <li><h1>Add flashcards</h1></li>
                        <li><h1>Study</h1></li>
                    </ol>
                    </div>
                </section>
                {!displayForm &&
                <section id='auth'>
                <button onClick={() => toggleDisplayForm()}>Start Learning</button>
                </section>
                }
        {displayForm &&
                    <div className='auth-block'>
                    {activeForm === 'Sign in' ? <AuthForm type="sign in" /> : renderForm('Sign in')}
                    {activeForm === 'Sign up' ? <AuthForm type="sign up" /> : renderForm('Sign up')}
                </div>
                }
        <footer id="footer">
        <p>&copy; 2024 QuickDeck. All rights reserved.</p>
                </footer>
        </>
    );
}

export default AuthPage
