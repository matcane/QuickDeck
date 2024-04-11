import Navbar from "../components/Navbar";
import Dashboard from "../views/Dashboard";
import Decks from '../views/Decks';
import DeckEdit from "../views/DeckEdit";
import './HomePage.css'


function HomePage () {
    let view = window.localStorage.getItem("view");


    return (
        <div className="home">
            <Navbar />
            {view === 'Dashboard' ? <Dashboard /> : <></>}
            {view === 'Decks' ? <Decks /> : <></>}
            {view === 'Deck-edit' ? <DeckEdit /> : <></>}
        </div>
    )
}

export default HomePage