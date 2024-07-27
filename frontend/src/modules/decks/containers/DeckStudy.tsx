import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useDecksStore } from "../store/DecksStore";
import { useParams } from "react-router-dom";
import useFlashcardNavigator from "../hooks/useFlashcardNavigator";

function DeckStudy() {
    const { pk } = useParams();
    const fetchDeck = useDecksStore((state) => state.fetchDeck);
    const currentDeck = useDecksStore((state) => state.currentDeck);

    const status = useDecksStore((state) => state.status);

    useEffect(() => {
        fetchDeck(pk);
    }, [fetchDeck, pk]);

    const {
        currentFlashcard,
        currentFlashcardSide,
        handleNextClick,
        handleFlipSide,
    } = useFlashcardNavigator();

    return (
        <>
            {status.loading ? (
                <div className="flex w-full justify-center items-center">
                    <Spinner size="xl" className="text-blue-900/50" />
                </div>
            ) : (
                <div className="flex flex-col h-full w-full p-2.5 m-0">
                    <div
                        className="flex w-full h-3/4 justify-evenly items-center m-0 border-2 rounded-lg cursor-pointer select-none"
                        onClick={() => handleFlipSide()}
                    >
                        {currentFlashcardSide ? (
                            <h1 className="max-w-60 break-words md:max-w-md xl:max-w-xl">
                                {
                                    currentDeck?.flashcards?.[currentFlashcard]
                                        .front
                                }
                            </h1>
                        ) : (
                            <h1 className="max-w-60 break-words md:max-w-md xl:max-w-xl">
                                {
                                    currentDeck?.flashcards?.[currentFlashcard]
                                        .back
                                }
                            </h1>
                        )}
                    </div>
                    <div className="flex w-full h-1/6 justify-evenly items-center m-0 select-none">
                        <h1>
                            {currentFlashcard +
                                1 +
                                "/" +
                                currentDeck?.flashcards?.length}
                        </h1>
                    </div>
                    <div
                        className="flex w-full h-1/6 justify-evenly items-center m-0 border-2 rounded-lg cursor-pointer select-none"
                        onClick={() =>
                            handleNextClick(currentDeck?.flashcards?.length)
                        }
                    >
                        <h1>Next</h1>
                    </div>
                </div>
            )}
        </>
    );
}

export default DeckStudy;
