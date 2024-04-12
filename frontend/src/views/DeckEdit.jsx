import { useState, useEffect } from 'react';
import { deck_detail } from '../services/deck';
import { flashcard_add, flashcard_delete } from '../services/flashcard';
import { deck_delete } from '../services/deck';
import FlashcardForm from '../components/FlashcardForm';
import './DeckEdit.css'


function DeckEdit() {
    let deck_id = window.localStorage.getItem("deck_id");
    let deck_title = window.localStorage.getItem("deck_title");
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        fetchDeckData();
    }, []);

    const fetchDeckData = async () => {
        try{
            const response = await deck_detail(deck_id);
            setFlashcards(response.flashcards);
            console.log(response.flashcards);
        } catch (error) {
            console.log(error);
        }
    };

    const updateFlashcards = (flashcard) => {
        setFlashcards([...flashcards, flashcard]);
    };

    const handleDeleteFlashcard = async (e, flashcard_id) => {
        e.preventDefault();
        try{
            const response = await flashcard_delete(deck_id, flashcard_id);
            setFlashcards(prevFlashcards => {
                return prevFlashcards.filter(flashcard => flashcard.id !== flashcard_id);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteDeck = async () => {
        try{
            const response = await deck_delete(deck_id);
            window.localStorage.setItem("view", "Decks"); 
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="deck-edit">
            <div className='deck-edit-header'>
                <div className='deck-edit-header-title'><h1 className='deck-edit-tile'>{deck_title}</h1></div>
                <div className='deck-edit-header-button'><button className='deck-edit-button' type='button'>Edit</button></div>
                <div className='deck-edit-header-button'><button className='deck-edit-button' type='button' onClick={() => handleDeleteDeck()}>Delete</button></div>
            </div>
            <div className='flashcards'>
                <div className='flashcard-item-container'>
                    <div className='flashcard-item'>
                        <FlashcardForm update={updateFlashcards}/>
                    </div>
                </div>
                {flashcards.map((flashcard, index) => (
                <div className='flashcard-item-container' key={index}>
                    <div className='flashcard-item'>
                        <div className='flashcard-content'>
                            <div className='flashcard-item-data'>
                            <p className='flashcard-item-text'>{flashcard.front}</p>
                            </div>
                            <div className='flashcard-item-data'>
                            <p className='flashcard-item-text'>{flashcard.back}</p>
                            </div>
                            <button className='deck-edit-button' type='button'>Edit</button>
                            <button className='deck-edit-button' type='button' onClick={(e) => handleDeleteFlashcard(e, flashcard.id)}>Delete</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default DeckEdit