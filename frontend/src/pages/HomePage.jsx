import Navbar from "../components/Navbar";
import Dashboard from "../views/Dashboard";
import Decks from '../views/Decks';
import './HomePage.css'



function HomePage () {
    let view = window.localStorage.getItem("view");

    return (
        <div className="home">
            <Navbar />
            {view === 'Dashboard' ? <Dashboard /> : <></>}
            {view === 'Decks' ? <Decks /> : <></>}
        </div>
    )
}

export default HomePage