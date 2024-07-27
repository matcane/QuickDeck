import api from "@/config/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

type TUser = {
    pk: number | null;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
};

type TAuthStore = {
    isLoggedIn: boolean;
    user: TUser;
    status: {
        loading: boolean;
        success: boolean;
        error: boolean;
    };
    errorData: AxiosError | unknown;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    verify: () => Promise<void>;
};

const initialState = {
    isLoggedIn: false,
    user: { pk: null, username: "", email: "", first_name: "", last_name: "" },
    status: { loading: false, success: false, error: false },
    errorData: null,
};

const useAuthStore = create<TAuthStore>((set) => ({
    ...initialState,
    login: async (username, password) => {
        try {
            const response = await api.post("/login/", {
                username,
                password,
            });
            if (response.status === 200) {
                set({
                    isLoggedIn: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    register: async (username, password) => {
        try {
            await api.post("/register/", {
                username,
                password,
            });
        } catch (error) {
            console.log(error);
        }
    },
    logout: async () => {
        try {
            const response = await api.post("/logout/");
            if (response.status === 200) {
                set({
                    isLoggedIn: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    verify: async () => {
        set({ status: { ...initialState.status, loading: true } });
        try {
            const response = await api.get("/user/");
            if (response.status === 200) {
                set({
                    status: { ...initialState.status, success: true },
                    user: response.data,
                    isLoggedIn: true,
                });
            }
        } catch (error) {
            console.log(error);
            set({
                status: { ...initialState.status, error: true },
                errorData: error,
            });
        }
    },
}));

export default useAuthStore;
