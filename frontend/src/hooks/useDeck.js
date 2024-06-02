export default function useDeck() {
    function editDeck(deck) {
        window.localStorage.setItem("deck_id", deck.id);
        window.localStorage.setItem("deck_title", deck.title);
        window.localStorage.setItem("view", "Deck-edit");
        window.location.reload(false);
    }

    function studyDeck(deck) {
        if (deck.flashcards.length !== 0) {
            window.localStorage.setItem("deck_id", deck.id);
            window.localStorage.setItem("deck_title", deck.title);
            window.localStorage.setItem("view", "Deck-study");
            window.location.reload(false);
        }
    }

    return { editDeck, studyDeck }
}