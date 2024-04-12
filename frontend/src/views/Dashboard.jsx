import React, { useEffect, useState } from 'react';
import { deck_list } from '../services/deck';
import Popup from '../components/Popup';
import './Dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState(window.localStorage.getItem("username") || "");
  const [showAddDeckPopup, setShowAddDeckPopup] = useState(false);
  const [decksQuantity, setDecksQuantity] = useState();

  useEffect(() => {
    fetchDecksQuantityData();
  }, [decksQuantity]);

const fetchDecksQuantityData = async () => {
    try{
        const response = await deck_list();
        setDecksQuantity(response.length);
        console.log(response.length);
    } catch (error) {
        console.log(error);
    }
}
  
  const handlePopupToggle = () => {
    setShowAddDeckPopup(!showAddDeckPopup);
  };

  return (
    <div className="dashboard">
      <div>
        <h1>Hi {username}</h1>
        <h1>{decksQuantity} decks created</h1>
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