import React, { useState } from 'react';
import { deck_add } from '../services/deck';
import './Dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState(window.localStorage.getItem("username") || "");
  const [showAddDeckPopup, setShowAddDeckPopup] = useState(false);
  const [deckTitle, setDeckTitle] = useState("");

  const handleAddDeck = async () => {
    try{
        const response = await deck_add(deckTitle);
        setShowAddDeckPopup(false);
        window.localStorage.setItem("deck_id", response.id);
        window.localStorage.setItem("deck_title", response.title);
        window.localStorage.setItem("view", "Deck-edit");
        window.location.reload(false);
    } catch (error) {
        console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setDeckTitle(event.target.value);
  };

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
      {showAddDeckPopup && (
        <div className='popup'>
            <div className="add-deck-popup">
                <input className='popup-input' type="text" value={deckTitle} onChange={handleInputChange} placeholder="Enter deck title" />
                <button className='popup-button' onClick={handleAddDeck}>Add Deck</button>
                <button className='popup-button' onClick={handlePopupToggle}>Close</button>
            </div>
        </div>
        
      )}
    </div>
  );
}

export default Dashboard;