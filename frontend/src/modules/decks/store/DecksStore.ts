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
    status: {
        loading: boolean;
        success: boolean;
        error: boolean;
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
    status: { loading: false, success: false, error: false },
    errorData: null,
};

export const useDecksStore = create<TDecksStore>((set) => ({
    ...initialState,
    fetchDecks: async () => {
        set({ status: { ...initialState.status, loading: true } });
        try {
            const response = await api.get("/deck_list/");
            set({
                decks: response.data,
                status: { ...initialState.status, success: true },
            });
        } catch (error) {
            console.log(error);
            set({
                status: { ...initialState.status, error: true },
                errorData: error,
            });
        }
    },
    fetchDeck: async (id) => {
        set({ status: { ...initialState.status, loading: true } });
        try {
            const response = await api.get("/deck/" + id + "/");
            set({
                currentDeck: response.data,
                status: { ...initialState.status, success: true },
            });
        } catch (error) {
            console.log(error);
            set({
                status: { ...initialState.status, error: true },
                errorData: error,
            });
        }
    },
    updateDeckTitle: async (pk, title) => {
        try {
            const response = await api.put(`/deck_update/${pk}/`, {
                title,
            });
            set({
                currentDeck: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    },
    deleteDeck: async (pk) => {
        try {
            await api.delete(`/deck_delete/${pk}/`);
        } catch (error) {
            console.log(error);
        }
    },
    addFlashcard: async (pk, front, back) => {
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
                    }) as TDecksStore
            );
        } catch (error) {
            console.log(error);
        }
    },
    deleteFlashcard: async (pk_deck, pk_card) => {
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
                    }) as TDecksStore
            );
        } catch (error) {
            console.log(error);
        }
    },
    updateFlashcard: async (pk_deck, pk_card, front, back) => {
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
                    }) as TDecksStore
            );
        } catch (error) {
            console.log(error);
        }
    },
}));
