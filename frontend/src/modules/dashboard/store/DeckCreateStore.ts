import api from "@/config/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

type TDeckCreateStore = {
    status: {
        loading: boolean;
        success: boolean;
        error: boolean;
    };
    errorData: AxiosError | unknown;
    createDeck: (title: string) => Promise<void>;
};

const initialState = {
    status: { loading: false, success: false, error: false },
    errorData: null,
};

export const useDeckCreateStore = create<TDeckCreateStore>((set) => ({
    ...initialState,
    createDeck: async (title) => {
        set({ status: { ...initialState.status, loading: true } });
        try {
            await api.post("/deck_create/", { title });
            set({
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
}));
