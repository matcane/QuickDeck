import { Button, Drawer, TextInput, Card } from "flowbite-react";
import { useState } from "react";
import { useDeckCreateStore } from "../store/DeckCreateStore";
import { useNavigate } from "react-router-dom";

export function PopUp() {
    const [isOpen, setIsOpen] = useState(false);
    const [deckTitle, setDeckTitle] = useState("");

    const navigate = useNavigate();

    const createDeck = useDeckCreateStore((state) => state.createDeck);
    const status = useDeckCreateStore((state) => state.status);

    const handleClose = () => {
        setIsOpen(false);
        setDeckTitle("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDeckTitle(e.target.value);

    const createNewDeck = async () => {
        await createDeck(deckTitle);
        navigate("/d", { replace: true });
    };

    return (
        <>
            <div className="flex h-full items-center justify-center">
                <Card
                    className="h-1/2 w-full m-4 hover:bg-gray-100 dark:hover:bg-gray-700 max-w-sm cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Create a new deck
                    </p>
                </Card>
            </div>
            <Drawer
                open={isOpen}
                onClose={handleClose}
                position="bottom"
                className="z-50 h-1/3 md:h-1/6 lg:h-1/6 xl:h-60"
            >
                <Drawer.Items>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 xl:text-5xl">
                        Enter the name of your deck
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <TextInput
                            maxLength={50}
                            minLength={3}
                            sizing="lg"
                            type="text"
                            required
                            value={deckTitle}
                            onChange={handleInputChange}
                        />
                        <Button
                            isProcessing={status.loading}
                            size="xl"
                            onClick={createNewDeck}
                        >
                            Create
                        </Button>
                    </div>
                </Drawer.Items>
            </Drawer>
        </>
    );
}
