import React, { useState } from 'react';
import Popup from '../components/Popup';
import './Dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState(window.localStorage.getItem("username") || "");
  const [showAddDeckPopup, setShowAddDeckPopup] = useState(false);
  
  const handlePopupToggle = () => {
    setShowAddDeckPopup(!showAddDeckPopup);
  };

  return (
    <div className="dashboard">
      <div>
        <h1>Hi {username}</h1>
        <h1>13 decks created & 0 decks generated</h1>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-content-button" onClick={handlePopupToggle}>Create</div>
        <div className="dashboard-content-button">Generate</div>
      </div>
      {showAddDeckPopup ? <Popup close={handlePopupToggle}/> : <></>}
    </div>
  );
}

export default Dashboard;