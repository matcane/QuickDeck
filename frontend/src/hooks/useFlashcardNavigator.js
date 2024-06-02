import { useState } from "react";

export default function useFlashcardNavigator() {
    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [currentFlashcardSide, setCurrentFlashcardSide] = useState(true);


    const handleNextClick = (deck_length) => {
        setCurrentFlashcard((prevIndex) => (prevIndex + 1) % deck_length);
        setCurrentFlashcardSide(true);
    };

    const handleFlipSide = () => {
        setCurrentFlashcardSide(!currentFlashcardSide);
    }

    return { currentFlashcard, currentFlashcardSide, handleNextClick, handleFlipSide }
}