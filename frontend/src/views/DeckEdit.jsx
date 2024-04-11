import { useState, useEffect } from 'react';
import { deck_detail } from '../services/deck';
import { flashcard_add, flashcard_delete } from '../services/flashcard';
import './DeckEdit.css'


function DeckEdit() {
    let deck_id = window.localStorage.getItem("deck_id");
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

    return (
        <div className="deck-edit">
            <div>
                <h1>[PLACEHOLDER]</h1>
            </div>
            <div className='flashcards'>
                <div className='flashcard-item-container'>
                    <div className='flashcard-item'>
                        <form className='flashcard-form' onSubmit={(e) => handleAddFlashcard(e)}>
                            <input className='flashcard-item-input' type="text" placeholder='Frontside' required value={frontSideFlashcard} onChange={e => setFrontSideFlashcard(e.target.value)}/>
                            <input className='flashcard-item-input' type="text" placeholder='Backside' required value={backSideFlashcard} onChange={e => setBackSideFlashcard(e.target.value)}/>
                            <button className='flashcard-item-button' type='submit'>Add</button>
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
                            <button className='flashcard-item-button' type='button'>Edit</button>
                            <button className='flashcard-item-button' type='button' onClick={(e) => handleDeleteFlashcard(e, flashcard.id)}>Delete</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default DeckEdit