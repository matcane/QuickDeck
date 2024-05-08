import React from "react";
import { Button } from "flowbite-react";
import { deck_delete, deck_update} from '../services/deck';

export function Deck(props) {
    const { edit, setEdit, data, setData, id, onClick } = props;
    const [isLoadingEdit, setIsLoadingEdit] = React.useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

    const updateDeck = async () => {
        setIsLoadingEdit(true);
        try{
            if (data !== window.localStorage.getItem("deck_title")){
                const response = await deck_update(id, data);
                window.localStorage.setItem("deck_title", response.title);
            }
            setEdit(false);
            setIsLoadingEdit(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteDeck = async () => {
        setIsLoadingDelete(true);
        try{
            const response = await deck_delete(id);
            window.localStorage.setItem("view", "Decks");
            window.location.reload(false);
            setIsLoadingDelete(false);
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <>
            {edit && <input minLength={3} maxLength={50} autoFocus className="w-3/4 text-2xl bg-transparent" required value={data} onChange={e => setData(e.target.value)}/>}
            {!edit && <span className='w-3/4 text-2xl text-center truncate hover:bg-gray-600 hover:cursor-pointer' onClick={() => onClick()}>{data}</span>}

            <div className='flex w-full justify-center px-5'>
                <Button isProcessing={isLoadingEdit} color="lightblue" size="xl" type='button' onClick={() => {edit ? updateDeck() : setEdit(true)}} className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>{edit ? "Save" : "Edit"}</Button>
                <Button isProcessing={isLoadingDelete} color="lightred" size="xl" type='button' onClick={() => handleDeleteDeck()} className='w-full ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>Delete</Button>
            </div>
        </>
    )
}