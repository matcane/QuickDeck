import { useState } from 'react';
import api from './services/api';
import './App.css'


function App() {

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let loggedUser = window.localStorage.getItem("isLogged");

  const handleMouseEnter = () => {
    setShowLoginForm(prefShowLoginForm => !prefShowLoginForm);
    setShowRegisterForm(prefShowRegisterForm => !prefShowRegisterForm);
  };

const Logout = async (e) => {
  e.preventDefault();
  try {
      const res = await api.post("/api/logout/", {
        refresh_token: window.localStorage.getItem('refresh_token')
      })
      window.localStorage.clear();
      window.location.reload(false);
  } catch (error) {
      console.log(error);
  }
};

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await api.post("/api/token/", {
          username: username,
          password: password
        })
        window.localStorage.clear();
        window.localStorage.setItem('access_token', res.data.access);
        window.localStorage.setItem('refresh_token', res.data.refresh);
        window.localStorage.setItem("isLogged", true);
        setUsername("");
        setPassword("");
        window.location.reload(false);
    } catch (error) {
        console.log(error);
    }
};


  if (!loggedUser){
    return (
      <>
          <div className='header-text'><h1>QuickDeck Creator</h1></div>
          <div className='login-register-block'>
          {showLoginForm ?
          <form className='login-form' onSubmit={e => submitLogin(e)}>
            <label className='login-form-label' htmlFor="email-login">Usernmame</label>
            <input className='login-form-input' type="text" name="login" id="email-login" required value={username} onChange={e => setUsername(e.target.value)}/> 
            <label className='login-form-label' htmlFor="password-login">Password</label>
            <input className='login-form-input' type="password" name='passowrd' id="password-login" required value={password} onChange={e => setPassword(e.target.value)}/>
            <button className='login-form-button'>Login</button>
          </form>
          :
          <div className="login-form-display">
            <h1 onMouseEnter={handleMouseEnter}>Login</h1>
          </div>
          }
          {showRegisterForm ?
          <form className='register-form' action="">
            <label className='login-form-label' htmlFor="email-register">E-mail</label>
            <input className='login-form-input' type="text" name="login" id="email-register" /> 
            <label className='login-form-label' htmlFor="name-register">Name</label>
            <input className='login-form-input' type="text" name='passowrd' id="name-register" />
            <label className='login-form-label' htmlFor="password-register">Password</label>
            <input className='login-form-input' type="password" name='passowrd' id="password-register" />
            <button className='login-form-button'>Register</button>
          </form>
          :
          <div className="register-form-display">
            <h1 onMouseEnter={handleMouseEnter}>Register</h1>
          </div>
          }
          </div>
      </>
    )
  }
  else {
    return (
      <>
        <p>USER LOGGED</p>
        <button onClick={(e) => Logout(e)}></button>
      </>
    )
  }
}

export default App
