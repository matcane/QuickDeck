import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import { useDecksStore } from "../store/DecksStore";

function Decks() {
    const fetchDecks = useDecksStore((state) => state.fetchDecks);
    const decks = useDecksStore((state) => state.decks);
    const fetchStatus = useDecksStore((state) => state.fetchStatus);

    useEffect(() => {
        fetchDecks();
    }, [fetchDecks]);

    if (fetchStatus.loading) {
        <div className="flex w-full justify-center items-center">
            <Spinner size="xl" className="text-blue-900/50" />
        </div>;
    }

    return (
        <div className="flex flex-col w-full overflow-y-auto">
            {decks?.map((deck, index) => (
                <div
                    className="flex flex-row justify-center items-center border-2 min-h-44 h-44 !important"
                    key={index}
                >
                    <div className="flex items-center justify-center h-full w-1/6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-6 h-6 hover:w-9 hover:h-9 hover:cursor-pointer"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="flex items-center h-full w-4/6 text-xl mx-2 overflow-x-auto break-words select-none hover:bg-gray-900 hover:cursor-pointer md:justify-center">
                        <h1>{deck.title}</h1>
                    </div>
                    <div className="flex items-center justify-center h-full w-1/6 text-xl select-none hover:bg-gray-900 hover:cursor-pointer">
                        <h1>Edit</h1>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Decks;
