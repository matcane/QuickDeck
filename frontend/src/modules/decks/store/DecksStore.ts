import api from "@/config/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

type TDeck = {
    id: number;
    title: string;
    owner: string;
    created: string;
    description: string;
    flashcards?: TFlashcard[];
};

type TFlashcard = {
    id: number;
    front: string;
    back: string;
};

type TDecksStore = {
    decks: TDeck[] | null;
    currentDeck: TDeck | null;
    fetchStatus: {
        loading: boolean;
        success: boolean;
        error: boolean;
    };
    loaders: {
        updateDeckTitleLoader: boolean;
        deleteDeckLoader: boolean;
        addFlashcardLoader: boolean;
        deleteFlashcardLoader: boolean;
        updateFlashcardLoader: boolean;
    };
    errors: {
        updateDeckTitleError: boolean;
        deleteDeckError: boolean;
        addFlashcardError: boolean;
        deleteFlashcardError: boolean;
        updateFlashcardError: boolean;
    };
    errorData: AxiosError | unknown;
    fetchDecks: () => Promise<void>;
    fetchDeck: (id: string | undefined) => Promise<void>;
    updateDeckTitle: (
        pk: number | undefined,
        title: string | undefined
    ) => Promise<void>;
    deleteDeck: (pk: number | undefined) => Promise<void>;
    addFlashcard: (
        pk: number | undefined,
        front: string,
        back: string
    ) => Promise<void>;
    deleteFlashcard: (
        pk_deck: number | undefined,
        pk_card: number | undefined
    ) => Promise<void>;
    updateFlashcard: (
        pk_deck: number | undefined,
        pk_card: number | undefined,
        front: string,
        back: string
    ) => Promise<void>;
};

const initialState = {
    decks: null,
    currentDeck: null,
    fetchStatus: { loading: false, success: false, error: false },
    loaders: {
        updateDeckTitleLoader: false,
        deleteDeckLoader: false,
        addFlashcardLoader: false,
        deleteFlashcardLoader: false,
        updateFlashcardLoader: false,
    },
    errors: {
        updateDeckTitleError: false,
        deleteDeckError: false,
        addFlashcardError: false,
        deleteFlashcardError: false,
        updateFlashcardError: false,
    },
    errorData: null,
};

export const useDecksStore = create<TDecksStore>((set) => ({
    ...initialState,
    fetchDecks: async () => {
        set({ fetchStatus: { loading: true, success: false, error: false } });
        try {
            const response = await api.get("/deck_list/");
            set({
                decks: response.data,
                fetchStatus: {
                    ...initialState.fetchStatus,
                    success: true,
                    loading: false,
                },
            });
        } catch (error) {
            console.log(error);
            set({
                fetchStatus: { ...initialState.fetchStatus, error: true },
                errorData: error,
            });
        }
    },
    fetchDeck: async (id) => {
        set({ fetchStatus: { loading: true, success: false, error: false } });
        try {
            const response = await api.get("/deck/" + id + "/");
            set({
                currentDeck: response.data,
                fetchStatus: {
                    ...initialState.fetchStatus,
                    success: true,
                    loading: false,
                },
            });
        } catch (error) {
            console.log(error);
            set({
                fetchStatus: { ...initialState.fetchStatus, error: true },
                errorData: error,
            });
        }
    },
    updateDeckTitle: async (pk, title) => {
        set({
            loaders: { ...initialState.loaders, updateDeckTitleLoader: true },
            errors: { ...initialState.errors },
        });
        try {
            const response = await api.put(`/deck_update/${pk}/`, {
                title,
            });
            set({
                currentDeck: response.data,
                loaders: {
                    ...initialState.loaders,
                    updateDeckTitleLoader: false,
                },
            });
        } catch (error) {
            console.log(error);
            set({
                errors: { ...initialState.errors, updateDeckTitleError: true },
                errorData: error,
            });
        }
    },
    deleteDeck: async (pk) => {
        set({
            loaders: { ...initialState.loaders, deleteDeckLoader: true },
            errors: { ...initialState.errors },
        });
        try {
            await api.delete(`/deck_delete/${pk}/`);
            set({
                loaders: { ...initialState.loaders, deleteDeckLoader: false },
            });
        } catch (error) {
            console.log(error);
            set({
                errors: { ...initialState.errors, deleteDeckError: true },
                errorData: error,
            });
        }
    },
    addFlashcard: async (pk, front, back) => {
        set({
            loaders: { ...initialState.loaders, addFlashcardLoader: true },
            errors: { ...initialState.errors },
        });
        try {
            const response = await api.post(`/deck/${pk}/flashcard_create/`, {
                front,
                back,
            });
            set(
                (state) =>
                    ({
                        currentDeck: {
                            ...state.currentDeck,
                            flashcards: [
                                ...(state.currentDeck?.flashcards || []),
                                response.data,
                            ],
                        },
                        loaders: {
                            ...initialState.loaders,
                            addFlashcardLoader: false,
                        },
                    }) as TDecksStore
            );
        } catch (error) {
            console.log(error);
            set({
                errors: { ...initialState.errors, addFlashcardError: true },
                errorData: error,
            });
        }
    },
    deleteFlashcard: async (pk_deck, pk_card) => {
        set({
            loaders: { ...initialState.loaders, deleteFlashcardLoader: true },
            errors: { ...initialState.errors },
        });
        try {
            await api.delete(`/deck/${pk_deck}/flashcard_delete/${pk_card}`);
            set(
                (state) =>
                    ({
                        currentDeck: {
                            ...state.currentDeck,
                            flashcards: state.currentDeck?.flashcards?.filter(
                                (flashcard) => flashcard.id !== pk_card
                            ),
                        },
                        loaders: {
                            ...initialState.loaders,
                            deleteFlashcardLoader: false,
                        },
                    }) as TDecksStore
            );
        } catch (error) {
            console.log(error);
            set({
                errors: { ...initialState.errors, deleteFlashcardError: true },
                errorData: error,
            });
        }
    },
    updateFlashcard: async (pk_deck, pk_card, front, back) => {
        set({
            loaders: { ...initialState.loaders, updateFlashcardLoader: true },
            errors: { ...initialState.errors },
        });
        try {
            await api.put(`/deck/${pk_deck}/flashcard_update/${pk_card}/`, {
                front,
                back,
            });
            set(
                (state) =>
                    ({
                        currentDeck: {
                            ...state.currentDeck,
                            flashcards: state.currentDeck?.flashcards?.map(
                                (flashcard) =>
                                    flashcard.id === pk_card
                                        ? { ...flashcard, front, back }
                                        : flashcard
                            ),
                        },
                        loaders: {
                            ...initialState.loaders,
                            updateFlashcardLoader: false,
                        },
                    }) as TDecksStore
            );
        } catch (error) {
            console.log(error);
            set({
                errors: { ...initialState.errors, updateFlashcardError: true },
                errorData: error,
            });
        }
    },
}));
