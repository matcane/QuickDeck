import api from "./api";

export const flashcard_add = async (deck_id, front, back) => {
    try {
        const response = await api.post("/api/deck/" + deck_id + "/flashcard_create/", { front: front, back: back })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const flashcard_update = async (deck_id, flashcard_id, front, back) => {
    try {
        const response = await api.put("/api/deck/" + deck_id + "/flashcard_update/" + flashcard_id + "/", { front: front, back: back })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const flashcard_delete = async (deck_id, flashcard_id) => {
    try{
        const response = await api.delete("/api/deck/" + deck_id + "/flashcard_delete/" + flashcard_id + "/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}