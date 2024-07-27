import { useState } from "react";
import { Button } from "flowbite-react";
import { useDecksStore } from "../store/DecksStore";

export function Flashcard({
    type,
    data,
    deckID,
    index,
    currentFlashcardEditIndex,
    handleEditFlashcard,
    setShowFlashcardEdit,
}: {
    type: string;
    data?: { id: number; front: string; back: string };
    deckID: number | undefined;
    index?: number | undefined;
    currentFlashcardEditIndex?: number | undefined;
    handleEditFlashcard?: (index: number | undefined) => void;
    setShowFlashcardEdit?: (show: false) => void;
}) {
    const [frontSideFlashcard, setFrontSideFlashcard] = useState(
        data?.front || ""
    );
    const [backSideFlashcard, setBackSideFlashcard] = useState(
        data?.back || ""
    );

    const addFlashcard = useDecksStore((state) => state.addFlashcard);
    const updateFlashcard = useDecksStore((state) => state.updateFlashcard);
    const deleteFlashcard = useDecksStore((state) => state.deleteFlashcard);
    const { addFlashcardLoader, updateFlashcardLoader, deleteFlashcardLoader } =
        useDecksStore((state) => state.loaders);

    const handleFlashcard = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === "create") {
            addFlashcard(deckID, frontSideFlashcard, backSideFlashcard);
            setFrontSideFlashcard("");
            setBackSideFlashcard("");
            setShowFlashcardEdit!(false);
        } else {
            await updateFlashcard(
                deckID,
                data?.id,
                frontSideFlashcard,
                backSideFlashcard
            );
            setShowFlashcardEdit!(false);
        }
    };

    return (
        <>
            {type === "view" ? (
                <div className="flex flex-col justify-between items-center md:flex-row">
                    <div className="w-full w-full mr-auto text-2xl m-3 overflow-x-hidden md:max-w-80">
                        <p className="max-w-screen-md m-0 text-sm lg:text-2xl">
                            {data?.front}
                        </p>
                    </div>
                    <div className="w-full w-full mr-auto text-2xl m-3 overflow-x-hidden md:max-w-80">
                        <p className="max-w-screen-md m-0 text-sm lg:text-2xl">
                            {data?.back}
                        </p>
                    </div>
                    <div className="flex w-full justify-center md:max-w-60">
                        <Button
                            color="lightblue"
                            size="sm"
                            className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 md:max-w-32"
                            type="button"
                            onClick={() => handleEditFlashcard!(index)}
                        >
                            Edit
                        </Button>
                        <Button
                            isProcessing={
                                deleteFlashcardLoader &&
                                currentFlashcardEditIndex === index
                            }
                            color="lightred"
                            size="sm"
                            className="w-full ml-4 bg-red-500 text-white rounded-lg hover:bg-red-600 md:max-w-32"
                            type="button"
                            onClick={() => {
                                handleEditFlashcard!(index);
                                deleteFlashcard(deckID, data?.id);
                                setShowFlashcardEdit!(false);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ) : (
                <form
                    className="flex flex-col border-white rounded-lg md:flex-row"
                    onSubmit={(e) => handleFlashcard(e)}
                >
                    <input
                        maxLength={255}
                        className="w-full text-sm m-0 bg-transparent lg:text-2xl"
                        type="text"
                        color="transparent"
                        placeholder="Frontside"
                        required
                        value={frontSideFlashcard}
                        onChange={(e) => setFrontSideFlashcard(e.target.value)}
                    />
                    <input
                        maxLength={255}
                        className="w-full text-sm m-0 bg-transparent lg:text-2xl"
                        type="text"
                        placeholder="Backside"
                        required
                        value={backSideFlashcard}
                        onChange={(e) => setBackSideFlashcard(e.target.value)}
                    />
                    <Button
                        isProcessing={
                            (addFlashcardLoader && type === "create") ||
                            (updateFlashcardLoader &&
                                type === "edit" &&
                                currentFlashcardEditIndex === index)
                        }
                        size="sm"
                        type="submit"
                        color="lightblue"
                        className="w-full m-0 bg-blue-500 text-white rounded-lg items-center hover:bg-blue-600 md:w-1/3"
                    >
                        {type === "create" ? "Add" : "Save"}
                    </Button>
                </form>
            )}
        </>
    );
}
