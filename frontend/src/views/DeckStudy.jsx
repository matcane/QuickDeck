import { deck_detail } from '../services/deck';
import { useState, useEffect } from 'react';
import './DeckStudy.css'

function DeckStudy() {
    let deck_id = window.localStorage.getItem("deck_id");
    const [flashcards, setFlashcards] = useState([]);
    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [currentFlashcardSide, setCurrentFlashcardSide] = useState(true);

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

    const handleNextClick = () => {
        setCurrentFlashcard((prevIndex) => (prevIndex + 1) % flashcards.length);
        setCurrentFlashcardSide(true);
    };

    const handleFlipSide = () => {
        setCurrentFlashcardSide(!currentFlashcardSide);
    }

    return (
        <div className='deck-study'>
            <div className='flashcard-view flashcard-view-content' onClick={() => handleFlipSide()}>
                {currentFlashcardSide ? 
                <h1>{flashcards.length > 0 && flashcards[currentFlashcard].front}</h1>
                :
                <h1>{flashcards.length > 0 && flashcards[currentFlashcard].back}</h1>
                }
                </div>
            <div className='flashcard-view'><h1>{flashcards.length > 0 && currentFlashcard + 1 + "/" + flashcards.length}</h1></div>
            <div className='flashcard-view flashcard-view-next' onClick={() => handleNextClick()}><h1>Next</h1></div>
        </div>
    )
}

export default DeckStudy