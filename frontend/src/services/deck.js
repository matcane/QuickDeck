import api from "./api";

export const deck_list = async () => {
    try {
        const response = await api.get("/api/deck_list/")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deck_detail = async (deck_id) => {
    try {
        console.log(deck_id);
        const response = await api.get("/api/deck/" + deck_id + "/")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deck_delete = async (deck_id) => {
    try {
        const response = await api.delete("/api/deck_delete/" + deck_id + "/")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}