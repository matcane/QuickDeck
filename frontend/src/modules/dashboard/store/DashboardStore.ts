import api from "@/config/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

type TDashboardStore = {
    quantity: number;
    status: {
        loading: boolean;
        success: boolean;
        error: boolean;
    };
    errorData: AxiosError | unknown;
    getDecksQuantity: () => Promise<void>;
};

const initialState = {
    quantity: 0,
    status: { loading: false, success: false, error: false },
    errorData: null,
};

export const useDashboardStore = create<TDashboardStore>((set) => ({
    ...initialState,
    getDecksQuantity: async () => {
        set({ status: { ...initialState.status, loading: true } });
        try {
            const response = await api.get("/deck_list/");
            set({
                quantity: response.data.length,
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
