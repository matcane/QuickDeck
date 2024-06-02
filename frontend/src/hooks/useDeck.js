export default function useDeck() {
    function editDeck(deck) {
        window.localStorage.setItem("deck_id", deck.id);
        window.localStorage.setItem("deck_title", deck.title);
        window.localStorage.setItem("view", "Deck-edit");
        window.location.reload(false);
    }

    function studyDeck(deck, deck_id=null, deckTitle=null) {
        if (deck.length !== 0) {
            window.localStorage.setItem("deck_id", deck_id ? deck_id : deck.id);
            window.localStorage.setItem("deck_title", deckTitle ? deckTitle : deck.title);
            window.localStorage.setItem("view", "Deck-study");
            window.location.reload(false);
        }
    }

    return { editDeck, studyDeck }
}