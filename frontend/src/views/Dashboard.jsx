import { sign_out } from "../services/auth";
import './Dashboard.css'


function Dashboard() {

    const Logout = async (e) => {
        e.preventDefault();
        await sign_out();
        window.localStorage.clear();
        window.location.reload(false);
    };

    return (
        <div className='dashboard'>
            <h1>USER LOGGED</h1>
            <button onClick={(e) => Logout(e)}>Sign out</button>
        </div>
    )
}

export default Dashboard