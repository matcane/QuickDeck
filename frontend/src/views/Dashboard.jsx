import './Dashboard.css'


function Dashboard() {
    let username = window.localStorage.getItem("username");

    return (
        <div className="dashboard">
            <div>
                <h1>Hi {username}</h1>
                <h1>13 decks created & 0 decks generated</h1>
            </div>
            <div className="dashboard-content">
                <div className="dashboard-content-button">Create</div>
                <div className="dashboard-content-button">Generate</div>
            </div>
        </div>
    )
}

export default Dashboard