import { useState } from 'react';
import { Auth } from "../components/Auth";
import { MyFooter } from '../components/MyFooter';
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

function AuthPage() {
    const [displayForm, setDisplayFrom] = useState(false);
    const [activeForm, setActiveForm] = useState("sign up");

    const openForm = () => {
        setDisplayFrom(!displayForm);
    };

    const toggleForm = (type) => {
        setActiveForm(type);
    };

    return (
        <>  
            {displayForm ? <Auth type={activeForm} toggle={toggleForm}/> :
            <>
            <header className='flex px-10 w-full h-screen justify-center items-center text-white'>
                <div className='flex flex-col'>
                    <h1 className='text-center text-xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-8xl'>Welcome to QuickDeck</h1>
                    <h2 className='text-xl my-20 lg:text-2xl'>Whether you want to master a new language, prepare for an exam, or simply reinforce your knowledge, QuickDeck is the perfect tool for you!</h2>
                    <div className='flex justify-center'>
                        <Button size="xl" gradientDuoTone="purpleToBlue" onClick={openForm}>
                            Start now!
                            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>
            <section className='flex flex-col px-10 justify-center items-center w-full h-screen bg-white text-black'>
                <h1 className='mb-16 text-center text-4xl sm:text-6xl md:text-8xl'>Why QuickDeck?</h1>
                <div className='flex flex-col w-full justify-center md:flex-row md:justify-evenly'>
                    <ul>
                        <li className='list-none p-0 m-8 border-2 border-gray-800 bounded-lg'><h1 className='m-8 text-center text-xl sm:text-3xl lg:text-5xl xl:text-7xl'>Smart Flashcards</h1></li>
                        <li className='list-none p-0 m-8 border-2 border-gray-800 bounded-lg'><h1 className='m-8 text-center text-xl sm:text-3xl lg:text-5xl xl:text-7xl'>Effective Learning</h1></li>
                    </ul>
                    <ul>
                        <li className='list-none p-0 m-8 mt-0 border-2 border-gray-800 bounded-lg md:mt-8'><h1 className='m-8 text-center text-xl sm:text-3xl lg:text-5xl xl:text-7xl'>Accessible Anywhere</h1></li>
                        <li className='list-none p-0 m-8 mt-0 border-2 border-gray-800 bounded-lg md:mt-8'><h1 className='m-8 text-center text-xl sm:text-3xl lg:text-5xl xl:text-7xl'>Community Support</h1></li>
                    </ul>
                </div>
            </section>
            <section className='flex px-10 justify-center items-center w-full h-screen text-white'>
                <div className='flex flex-col w-full justify-evenly lg:flex-row'>
                    <h1 className='mb-16 flex items-center justify-center text-2xl sm:text-5xl md:text-7xl lg:text-6xl xl:text-7xl'>How Does It Work?</h1>
                    <ol>
                        <li><h1 className='m-8 text-center text-2xl sm:text-5xl lg:text-5xl xl:text-7xl'>Create deck</h1></li>
                        <li>
                            <h1 className='flex justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32">
                                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                </svg>
                            </h1>
                        </li>
                        <li><h1 className='m-8 text-center text-2xl sm:text-5xl lg:text-5xl xl:text-7xl'>Add flashcards</h1></li>
                        <li>
                            <h1 className='flex justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32">
                                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                </svg>
                            </h1>
                        </li>
                        <li><h1 className='m-8 text-center text-2xl sm:text-5xl lg:text-5xl xl:text-7xl'>Study</h1></li>
                    </ol>
                </div>
            </section>
            <MyFooter />
            </>
            }
        </>
    );
}

export default AuthPage
