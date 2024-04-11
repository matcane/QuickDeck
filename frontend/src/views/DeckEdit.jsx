import { useState, useEffect } from 'react';
import { deck_detail } from '../services/deck';
import { flashcard_add, flashcard_delete } from '../services/flashcard';
import { deck_delete } from '../services/deck';
import './DeckEdit.css'


function DeckEdit() {
    let deck_id = window.localStorage.getItem("deck_id");
    let deck_title = window.localStorage.getItem("deck_title");
    const [flashcards, setFlashcards] = useState([]);
    const [frontSideFlashcard, setFrontSideFlashcard] = useState("");
    const [backSideFlashcard, setBackSideFlashcard] = useState("");

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

    const handleAddFlashcard = async (e) => {
        e.preventDefault();
        try{
            const response = await flashcard_add(deck_id, frontSideFlashcard, backSideFlashcard);
            setFlashcards([...flashcards, response]);
            setFrontSideFlashcard("");
            setBackSideFlashcard("");
        } catch (error) {
            console.log(error);
        }
    }

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
                        <form className='flashcard-form' onSubmit={(e) => handleAddFlashcard(e)}>
                            <input className='flashcard-item-input' type="text" placeholder='Frontside' required value={frontSideFlashcard} onChange={e => setFrontSideFlashcard(e.target.value)}/>
                            <input className='flashcard-item-input' type="text" placeholder='Backside' required value={backSideFlashcard} onChange={e => setBackSideFlashcard(e.target.value)}/>
                            <button className='deck-edit-button' type='submit'>Add</button>
                        </form>
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