import { useState, useEffect } from 'react';
import { deck_list } from '../services/deck';
import './Decks.css'

function Decks() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        fetchDecksData();
    }, []);

    const fetchDecksData = async () => {
        try{
            const response = await deck_list();
            setDecks(response);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    function editDeck(deck) {
        window.localStorage.setItem("deck_id", deck.id);
        window.localStorage.setItem("deck_title", deck.title);
        window.localStorage.setItem("view", "Deck-edit");
        window.location.reload(false);
    }

    return (
        <div className="decks">
            {decks.map((deck, index) => (
                    <div className='decks-item' key={index}>
                    <div className="decks-item-star decks-font">☆</div>
                    <div className='decks-item-title decks-font'>{deck.title}</div>
                    <div className='decks-item-edit decks-font' onClick={() => editDeck(deck)}>Edit</div>
                    <div className='decks-item-open decks-font'>Open</div>
                    </div>
                ))}
        </div>
    )
}

export default Decks