import { deck_detail } from '../services/deck';
import { Spinner } from "flowbite-react";
import useFetch from '../hooks/useFetch';
import useFlashcardNavigator from '../hooks/useFlashcardNavigator';


function DeckStudy() {
    let deck_id = window.localStorage.getItem("deck_id");
    const { data: deck, isFetching } = useFetch(() => deck_detail(deck_id), 'flashcards');
    const { currentFlashcard, currentFlashcardSide, handleNextClick, handleFlipSide } = useFlashcardNavigator();
    
    return (
        <>
        {isFetching ? <div className='flex w-full justify-center items-center'><Spinner size="xl" className="text-blue-900/50" /></div> :
        <div className='flex flex-col h-full w-full p-2.5 m-0'>
            <div className='flex w-full h-3/4 justify-evenly items-center m-0 border-2 rounded-lg cursor-pointer select-none' onClick={() => handleFlipSide()}>
                {currentFlashcardSide ? 
                    <h1 className='max-w-60 break-words md:max-w-md xl:max-w-xl'>{deck.length > 0 && deck[currentFlashcard].front}</h1>
                    :
                    <h1 className='max-w-60 break-words md:max-w-md xl:max-w-xl'>{deck.length > 0 && deck[currentFlashcard].back}</h1>
                    }
            </div>
            <div className='flex w-full h-1/6 justify-evenly items-center m-0 select-none'><h1>{deck.length > 0 && currentFlashcard + 1 + "/" + deck.length}</h1></div>
            <div className='flex w-full h-1/6 justify-evenly items-center m-0 border-2 rounded-lg cursor-pointer select-none' onClick={() => handleNextClick(deck.length)}><h1>Next</h1></div>
        </div>}
        </>
    )
}

export default DeckStudy