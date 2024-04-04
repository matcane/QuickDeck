import Navbar from "../components/Navbar";
import Dashboard from "../views/Dashboard";
import './HomePage.css'


function HomePage () {

    return (
        <div className="home">
            <Navbar />
            <Dashboard />
        </div>
    )
}

export default HomePage