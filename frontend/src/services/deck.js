import api from "./api";

export const deck_list = async () => {
    try {
        const response = await api.get("/api/deck_list/")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}