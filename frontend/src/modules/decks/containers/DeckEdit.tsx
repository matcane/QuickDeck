import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useDecksStore } from "../store/DecksStore";
import { Navigate, useParams } from "react-router-dom";
import { Flashcard } from "../components/Flashcard";
import { Deck } from "../components/Deck";

function DeckEdit() {
    const { pk } = useParams();
    const [currentFlashcardEditIndex, setCurrentFlashcardEditIndex] = useState<
        number | undefined
    >(undefined);
    const [showFlashcardEdit, setShowFlashcardEdit] = useState(false);
    const fetchDeck = useDecksStore((state) => state.fetchDeck);
    const currentDeck = useDecksStore((state) => state.currentDeck);

    const fetchStatus = useDecksStore((state) => state.fetchStatus);

    useEffect(() => {
        fetchDeck(pk);
    }, [fetchDeck, pk]);

    const handleEditFlashcard = async (index: number | undefined) => {
        setShowFlashcardEdit(true);
        setCurrentFlashcardEditIndex(index);
    };

    if (fetchStatus.loading) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <Spinner size="xl" className="text-blue-900/50" />
            </div>
        );
    }

    if (fetchStatus.error) {
        return <Navigate to="/d" replace />;
    }

    return (
        <div className="flex flex-col h-[calc(100%-4.5rem)] w-full gap-y-4 pt-4">
            {currentDeck?.flashcards && currentDeck.flashcards.length > 0 ? (
                <div className="flex flex-col w-full mb-2 max-h-20 justify-end items-center lg:flex-row lg:max-h-10">
                    <Deck title={currentDeck?.title} />
                </div>
            ) : (
                <div className="flex flex-col w-full mb-2 max-h-20 justify-end items-center lg:flex-row lg:max-h-10">
                    <Deck title={currentDeck?.title} />
                </div>
            )}

            <div className="flex flex-col max-h-40 justify-center mx-5 lg:max-h-[calc(3.125rem)]">
                <Flashcard
                    type="create"
                    deckID={currentDeck?.id}
                    setShowFlashcardEdit={setShowFlashcardEdit}
                />
            </div>
            <div className="flex flex-col overflow-y-auto">
                {currentDeck?.flashcards?.map((flashcard, index) => (
                    <div
                        className="flex flex-row h-auto p-2 m-4 md:p-16 border-2 border-white rounded-lg"
                        key={index}
                    >
                        <div className="w-full h-full">
                            {showFlashcardEdit &&
                            currentFlashcardEditIndex === index ? (
                                <Flashcard
                                    type="edit"
                                    data={flashcard}
                                    deckID={currentDeck?.id}
                                    setShowFlashcardEdit={setShowFlashcardEdit}
                                />
                            ) : (
                                <Flashcard
                                    type="view"
                                    data={flashcard}
                                    deckID={currentDeck?.id}
                                    index={index}
                                    currentFlashcardEditIndex={
                                        currentFlashcardEditIndex
                                    }
                                    handleEditFlashcard={handleEditFlashcard}
                                    setShowFlashcardEdit={setShowFlashcardEdit}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeckEdit;
