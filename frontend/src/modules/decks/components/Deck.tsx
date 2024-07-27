import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDecksStore } from "../store/DecksStore";
import { Link, useNavigate } from "react-router-dom";

export function Deck({ title }: { title: string | undefined }) {
    const [titleLocal, setTitleLocal] = useState(title);
    const [isEdit, setIsEdit] = useState(false);

    const updateDeckTitle = useDecksStore((state) => state.updateDeckTitle);
    const deleteDeck = useDecksStore((state) => state.deleteDeck);
    const currentDeck = useDecksStore((state) => state.currentDeck);
    const { updateDeckTitleLoader, deleteDeckLoader } = useDecksStore(
        (state) => state.loaders
    );

    const navigate = useNavigate();

    useEffect(() => {
        setTitleLocal(title);
    }, [title]);

    const handleEdit = async () => {
        if (title !== titleLocal) {
            await updateDeckTitle(currentDeck?.id, titleLocal);
            setIsEdit((prev) => !prev);
        } else {
            setIsEdit((prev) => !prev);
        }
    };

    const handleDelete = async () => {
        await deleteDeck(currentDeck?.id);
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
                <Link
                    className="flex w-full justify-center"
                    to={`/d/${currentDeck?.id}/study`}
                >
                    <span className="text-sm mb-2 text-center truncate hover:bg-gray-600 hover:cursor-pointer lg:text-2xl lg:w-3/4">
                        {titleLocal}
                    </span>
                </Link>
            )}
            <div className="flex w-full justify-center px-5">
                <Button
                    isProcessing={updateDeckTitleLoader && isEdit}
                    color="lightblue"
                    size="xs"
                    type="button"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleEdit}
                >
                    {isEdit ? "Save" : "Edit"}
                </Button>
                <Button
                    isProcessing={deleteDeckLoader}
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
