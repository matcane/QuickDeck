import Dashboard from "../views/Dashboard";
import Decks from '../views/Decks';
import DeckEdit from "../views/DeckEdit";
import DeckStudy from "../views/DeckStudy";
import { SideBar } from "../components/SideBar";


function HomePage () {
    let view = window.localStorage.getItem("view");


    return (
        <div className="flex h-screen w-screen pt-10 border-box sm:p-4">
            <SideBar />
            {view === 'Dashboard' ? <Dashboard /> : <></>}
            {view === 'Decks' ? <Decks /> : <></>}
            {view === 'Deck-edit' ? <DeckEdit /> : <></>}
            {view === 'Deck-study' ? <DeckStudy /> : <></>}
        </div>
    )
}

export default HomePage