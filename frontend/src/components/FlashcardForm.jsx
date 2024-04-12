import { useState } from 'react';
import { flashcard_add } from '../services/flashcard';
import './FlashcardForm.css'

function FlashcardForm ({update}) {
    let deck_id = window.localStorage.getItem("deck_id");
    const [frontSideFlashcard, setFrontSideFlashcard] = useState("");
    const [backSideFlashcard, setBackSideFlashcard] = useState("");

    const handleAddFlashcard = async (e) => {
        e.preventDefault();
        try{
            const response = await flashcard_add(deck_id, frontSideFlashcard, backSideFlashcard);
            update(response);
            setFrontSideFlashcard("");
            setBackSideFlashcard("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='flashcard-form' onSubmit={(e) => handleAddFlashcard(e)}>
            <input className='flashcard-item-input' type="text" placeholder='Frontside' required value={frontSideFlashcard} onChange={e => setFrontSideFlashcard(e.target.value)}/>
            <input className='flashcard-item-input' type="text" placeholder='Backside' required value={backSideFlashcard} onChange={e => setBackSideFlashcard(e.target.value)}/>
            <button type='submit'>Add</button>
        </form>
    )
}

export default FlashcardForm