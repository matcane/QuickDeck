
"use client";

import { Button, Drawer, TextInput, Card } from "flowbite-react";
import { useState } from "react";
import { deck_add } from '../services/deck';

export function PopUp({mode}) {
  const [isOpen, setIsOpen] = useState(false);
  const [deckTitle, setDeckTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {if(mode !== "Generate") {setIsOpen(true)}};
  const handleClose = () => {setIsOpen(false); setDeckTitle("")};
  const handleInputChange = (e) => setDeckTitle(e.target.value);

  const handleAddDeck = async () => {
    setIsLoading(true);
    try{
        const response = await deck_add(deckTitle);
        window.localStorage.setItem("deck_id", response.id);
        window.localStorage.setItem("deck_title", response.title);
        window.localStorage.setItem("view", "Deck-edit");
        window.location.reload(false);
        setIsLoading(false);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
      <Card className="h-1/2 w-full m-4 hover:bg-gray-100 dark:hover:bg-gray-700 max-w-sm cursor-pointer" onClick={() => handleOpen()}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {mode}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
            {mode === "Create" && <>Create a new deck</>}
            {mode === "Generate" && <>Generate deck with ChatGPT</>}
        
        </p>
        {mode === "Generate" && <p>In progress</p>}
      </Card>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="bottom" className="h-1/4 md:h-1/6 lg:h-1/6 xl:h-60">
        <Drawer.Items>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 xl:text-5xl">
            {mode === "Create" && <>Enter the name of your deck</>}
            {mode === "Generate" && <>Enter your prompt to ChatGPT</>}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextInput maxLength={50} minLength={3} sizing="lg" type="text" required value={deckTitle} onChange={handleInputChange}/>
            <Button isProcessing={isLoading} size="xl" onClick={handleAddDeck}>{mode}</Button>
            </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
