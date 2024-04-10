import { sign_out } from "../services/auth";
import './Navbar.css'

function Navbar() {

    const Logout = async (e) => {
        e.preventDefault();
        await sign_out();
        window.localStorage.clear();
        window.location.reload(false);
    };

    return (
        <div className="sidenav">
            <h1>QuickDeck</h1>
            <a>Dashboard</a>
            <a>Decks</a>
            <div>
                <h2 onClick={e => Logout(e)}>Logout</h2>
            </div>
            
        </div>
    )
}

export default Navbar