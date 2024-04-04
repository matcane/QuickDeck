import './App.css'

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';


function App() {

  let isLogged = window.localStorage.getItem("isLogged");

  return (
      isLogged ? <HomePage /> : <AuthPage />
  )

}

export default App
