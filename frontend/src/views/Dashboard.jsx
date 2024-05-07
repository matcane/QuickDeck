import React, { useEffect, useState } from 'react';
import { Spinner } from "flowbite-react";
import { deck_list } from '../services/deck';
import { PopUp } from '../components/Popup';

function Dashboard() {
  const [username, setUsername] = useState(window.localStorage.getItem("username") || "");
  const [decksQuantity, setDecksQuantity] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchDecksQuantityData();
  }, []);

const fetchDecksQuantityData = async () => {
    try{
        const response = await deck_list();
        setDecksQuantity(response.length);
        setIsFetching(false);
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className='flex flex-col w-full m-0 p-0 pt-0 text-center text-white sm:p-10'>
      <h1 className='max-w-sm truncate text-4xl md:max-w-2xl xl:max-w-screen-lg 2xl:max-w-screen-2xl 2xl:max-w-full'>{username}</h1>
      <h1 className='text-md'>{isFetching ? <Spinner size="sm" /> : decksQuantity} decks created</h1>
      <div className="flex flex-col justify-center h-full w-full lg:flex-row">
        <PopUp mode={"Create"} />
        <PopUp mode={"Generate"} />
      </div>
    </div>
  );
}

export default Dashboard;