import { useState, useEffect } from 'react';
import { Button, Spinner } from "flowbite-react";
import { deck_detail } from '../services/deck';
import { flashcard_delete } from '../services/flashcard';
import { Deck } from '../components/Deck';
import { Flashcard } from '../components/Flashcard';
import useFetch from '../hooks/useFetch';
import useDeck from '../hooks/useDeck';


function DeckEdit() {
    let deck_id = window.localStorage.getItem("deck_id");
    const [deckTitle, setDeckTitle] = useState(window.localStorage.getItem("deck_title"));
    const [currentFlashcardEditIndex, setCurrentFlashcardEditIndex] = useState();
    const [showFlashcardEdit, setShowFlashcardEdit] = useState(false);
    const [showDeckEdit, setShowDeckEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data: deck, setData: setDeck, isFetching } = useFetch(() => deck_detail(deck_id), 'flashcards', true);
    const { studyDeck } = useDeck()

    const addFlashcards = (flashcard) => {
        setDeck([...deck, flashcard]);
    };

    const updateFlashcards = (flashcard_edited) => {
        setDeck(prevFlashcards => {
            return prevFlashcards.map(flashcard => {
                if (flashcard.id === flashcard_edited.id) {
                    return { ...flashcard, front: flashcard_edited.front, back: flashcard_edited.back};
                } else {
                    return flashcard;
                }
            });
        });
        setShowFlashcardEdit(!showFlashcardEdit);
    };

    const handleDeleteFlashcard = async (e, flashcard_id) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await flashcard_delete(deck_id, flashcard_id);
            setDeck(prevFlashcards => {
                return prevFlashcards.filter(flashcard => flashcard.id !== flashcard_id);
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditFlashcard = async (index) => {
        setShowFlashcardEdit(true);
        setCurrentFlashcardEditIndex(index);
    }

    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex flex-col w-full h-60 justify-evenly items-center md:flex-row'>
                <Deck edit={showDeckEdit} setEdit={setShowDeckEdit} data={deckTitle} setData={setDeckTitle} id={deck_id} onClick={() => studyDeck(deck, deck_id, deckTitle)} />
            </div>
            <div className='flex flex-col h-44 justify-center mx-5'>
                <Flashcard type='create' update={addFlashcards} data="" />
            </div>
            <div className='flex flex-col overflow-y-auto'>
            {isFetching ? <div className='flex w-full h-screen justify-center items-center'><Spinner size="xl" className="text-blue-900/50" /></div> :
            <>
            {deck.map((flashcard, index) => (
                    <div className='flex flex-row h-auto p-2 m-4 md:p-16 border-2 border-white rounded-lg' key={index}>
                        <div className='w-full h-full'>
                        {showFlashcardEdit && currentFlashcardEditIndex === index ? <Flashcard type='edit' update={updateFlashcards} data={flashcard} /> :
                        <div className='flex flex-col justify-between items-center md:flex-row'>
                            <div className='w-full max-w-60 text-2xl m-3 overflow-x-hidden md:max-w-80'>
                                <p className='max-w-screen-md m-0'>{flashcard.front}</p>
                            </div>
                            <div className='w-full max-w-60 text-2xl m-3 overflow-x-hidden md:max-w-80'>
                                <p className='max-w-screen-md m-0'>{flashcard.back}</p>
                            </div>
                            <div className='flex w-full justify-center md:max-w-60'>
                                <Button color="lightblue" size="xl" className='w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 md:max-w-32' type='button' onClick={() => handleEditFlashcard(index)}>Edit</Button>
                                <Button isProcessing={isLoading} color="lightred" size="xl" className='w-full ml-4 bg-red-500 text-white rounded-lg hover:bg-red-600 md:max-w-32' type='button' onClick={(e) => handleDeleteFlashcard(e, flashcard.id)}>Delete</Button>
                            </div>
                        </div>
                    }
                        </div>
                    </div>
                ))}</>}
            </div>
        </div>
    )
}

export default DeckEdit