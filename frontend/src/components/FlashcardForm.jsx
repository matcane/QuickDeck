import { useState } from 'react';
import { flashcard_add, flashcard_update } from '../services/flashcard';
import './FlashcardForm.css'

function FlashcardForm ({type, update, data}) {
    let deck_id = window.localStorage.getItem("deck_id");
    const [frontSideFlashcard, setFrontSideFlashcard] = useState(data.front || "");
    const [backSideFlashcard, setBackSideFlashcard] = useState(data.back || "");

    const handleFlashcard = async (e) => {
        e.preventDefault();
        if(type === "create"){
            AddFlashcard();
        }
        else if(type === "edit"){
            UpdateFlashcard();
        }
    }

    const AddFlashcard = async () => {
        try{
            const response = await flashcard_add(deck_id, frontSideFlashcard, backSideFlashcard);
            update(response);
            setFrontSideFlashcard("");
            setBackSideFlashcard("");
        } catch (error) {
            console.log(error);
        }
    }

    const UpdateFlashcard = async () => {
        try{
            const response = await flashcard_update(deck_id, data.id, frontSideFlashcard, backSideFlashcard);
            update(response);
            setFrontSideFlashcard("");
            setBackSideFlashcard("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='flashcard-form' onSubmit={(e) => handleFlashcard(e)}>
            <input className='flashcard-item-input' type="text" placeholder="Frontside" required value={frontSideFlashcard} onChange={e => setFrontSideFlashcard(e.target.value)}/>
            <input className='flashcard-item-input' type="text" placeholder="Backside" required value={backSideFlashcard} onChange={e => setBackSideFlashcard(e.target.value)}/>
            <button type='submit'>{type === "create" ? "Add" : "Save"}</button>
        </form>
    )
}

export default FlashcardForm