import { deck_detail } from '../services/deck';
import { Spinner } from "flowbite-react";
import { useState, useEffect } from 'react';

function DeckStudy() {
    let deck_id = window.localStorage.getItem("deck_id");
    const [flashcards, setFlashcards] = useState([]);
    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [currentFlashcardSide, setCurrentFlashcardSide] = useState(true);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchDeckData();
    }, []);

    const fetchDeckData = async () => {
        try{
            const response = await deck_detail(deck_id);
            setFlashcards(response.flashcards);
            setIsFetching(false);
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
        <>
        {isFetching ? <div className='flex w-full h-screen justify-center items-center'><Spinner size="xl" className="text-blue-900/50" /></div> :
        <div className='flex flex-col h-full w-full p-2.5 m-0'>
            <div className='flex w-full h-3/4 justify-evenly items-center m-0 border-2 rounded-lg cursor-pointer select-none' onClick={() => handleFlipSide()}>
                {currentFlashcardSide ? 
                    <h1 className='max-w-60 break-words md:max-w-md xl:max-w-xl'>{flashcards.length > 0 && flashcards[currentFlashcard].front}</h1>
                    :
                    <h1 className='max-w-60 break-words md:max-w-md xl:max-w-xl'>{flashcards.length > 0 && flashcards[currentFlashcard].back}</h1>
                    }
            </div>
            <div className='flex w-full h-1/6 justify-evenly items-center m-0 select-none'><h1>{flashcards.length > 0 && currentFlashcard + 1 + "/" + flashcards.length}</h1></div>
            <div className='flex w-full h-1/6 justify-evenly items-center m-0 border-2 rounded-lg cursor-pointer select-none' onClick={() => handleNextClick()}><h1>Next</h1></div>
        </div>}
        </>
    )
}

export default DeckStudy