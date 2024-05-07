import { useState } from 'react';
import { Button } from "flowbite-react";
import { flashcard_add, flashcard_update } from '../services/flashcard';

export function Flashcard ({type, update, data}) {
    let deck_id = window.localStorage.getItem("deck_id");
    const [frontSideFlashcard, setFrontSideFlashcard] = useState(data.front || "");
    const [backSideFlashcard, setBackSideFlashcard] = useState(data.back || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleFlashcard = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
            setIsLoading(false);
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
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <form className='flex flex-col border-white rounded-lg md:flex-row' onSubmit={(e) => handleFlashcard(e)}>
            <input maxLength={255} className='w-full text-2xl m-0 bg-transparent' type="text" color='transparent' placeholder="Frontside" required value={frontSideFlashcard} onChange={e => setFrontSideFlashcard(e.target.value)}/>
            <input maxLength={255} className='w-full text-2xl m-0 bg-transparent' type="text" placeholder="Backside" required value={backSideFlashcard} onChange={e => setBackSideFlashcard(e.target.value)}/>
            <Button isProcessing={isLoading} size="xl" type='submit' color="lightblue" className='w-full m-0 bg-blue-500 text-white rounded-lg hover:bg-blue-600 md:w-1/3'>{type === "create" ? "Add" : "Save"}</Button>
        </form>
        </>
    )
}