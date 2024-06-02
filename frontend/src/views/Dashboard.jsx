import React, { useEffect, useState } from 'react';
import { Spinner } from "flowbite-react";
import { deck_list } from '../services/deck';
import { PopUp } from '../components/Popup';
import useFetch from '../hooks/useFetch';

function Dashboard() {
  const [ username ] = useState(window.localStorage.getItem("username") || "");
  const { data: decks, isFetching } = useFetch(deck_list);

  return (
    <div className='flex flex-col w-full m-0 p-0 pt-0 text-center text-white sm:p-10'>
      <h1 className='max-w-sm truncate text-4xl md:max-w-2xl xl:max-w-screen-lg 2xl:max-w-screen-2xl 2xl:max-w-full'>{username}</h1>
      <h1 className='text-md'>{isFetching ? <Spinner size="sm" /> : decks?.length} decks created</h1>
      <div className="flex flex-col justify-center h-full w-full lg:flex-row">
        <PopUp mode={"Create"} />
        <PopUp mode={"Generate"} />
      </div>
    </div>
  );
}

export default Dashboard;