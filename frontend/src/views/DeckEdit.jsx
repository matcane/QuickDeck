import { useState, useEffect } from 'react';
import { deck_detail } from '../services/deck';
import './DeckEdit.css'


function DeckEdit() {
    let deck_id = window.localStorage.getItem("deck_id");
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

    return (
        <div className="deck-edit">
            <div>
                <h1>[PLACEHOLDER]</h1>
            </div>
            <div className='flashcards'>
                <div className='flashcard-item-container'>
                    <div className='flashcard-item'>
                        <form className='flashcard-form' onSubmit={(e) => console.log(e)}>
                            <input className='flashcard-item-input' type="text" placeholder='Frontside'/>
                            <input className='flashcard-item-input' type="text" placeholder='Backside'/>
                            <button className='flashcard-item-button' type='button'>Add</button>
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
                            <button className='flashcard-item-button' type='button'>Delete</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default DeckEdit