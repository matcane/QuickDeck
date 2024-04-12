import { useState } from 'react';
import { deck_add } from '../services/deck';
import './Popup.css'

function Popup ({close}) {
    const [deckTitle, setDeckTitle] = useState("");

    const handleAddDeck = async () => {
        try{
            const response = await deck_add(deckTitle);
            close();
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

    return(
        <div className='popup'>
            <div className="add-deck-popup">
                <input className='popup-input' type="text" value={deckTitle} onChange={handleInputChange} placeholder="Enter deck title" />
                <button className='popup-button' onClick={handleAddDeck}>Add Deck</button>
                <button className='popup-button' onClick={close}>Close</button>
            </div>
        </div>
    )
}

export default Popup