import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDecksStore } from "../store/DecksStore";
import { useNavigate } from "react-router-dom";

export function Deck({ title }: { title: string | undefined }) {
    const [titleLocal, setTitleLocal] = useState(title);
    const [isEdit, setIsEdit] = useState(false);

    const updateDeckTitle = useDecksStore((state) => state.updateDeckTitle);
    const deleteDeck = useDecksStore((state) => state.deleteDeck);
    const deckID = useDecksStore((state) => state.currentDeck?.id);

    const navigate = useNavigate();

    useEffect(() => {
        setTitleLocal(title);
    }, [title]);

    const handleEdit = () => {
        if (title !== titleLocal) {
            updateDeckTitle(deckID, titleLocal);
        }
        setIsEdit((prev) => !prev);
    };

    const handleDelete = async () => {
        await deleteDeck(deckID);
        navigate("/d", { replace: true });
    };

    return (
        <>
            {isEdit ? (
                <input
                    minLength={3}
                    maxLength={50}
                    autoFocus
                    className="w-3/4 mb-2 text-sm bg-transparent lg:text-2xl"
                    required
                    value={titleLocal}
                    onChange={(e) => setTitleLocal(e.target.value)}
                />
            ) : (
                <span className="text-sm mb-2 text-center truncate hover:bg-gray-600 hover:cursor-pointer lg:text-2xl lg:w-3/4">
                    {titleLocal}
                </span>
            )}
            <div className="flex w-full justify-center px-5">
                <Button
                    color="lightblue"
                    size="xs"
                    type="button"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleEdit}
                >
                    {isEdit ? "Save" : "Edit"}
                </Button>
                <Button
                    color="lightred"
                    size="xs"
                    type="button"
                    className="w-full ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        </>
    );
}
