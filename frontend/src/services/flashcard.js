import api from "./api";

export const flashcard_add = async (deck_id, front, back) => {
    try {
        const response = await api.post("/api/deck/" + deck_id + "/flashcard_create/", { front: front, back: back })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}