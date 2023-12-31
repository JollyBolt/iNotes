import { useContext, useState, useEffect } from 'react'
import Search from '../components/Search';
import { Outlet, useOutletContext } from 'react-router-dom';
import noteContext from '../context/noteContext';
import Footer from '../components/Footer';
import { Spinner } from "@material-tailwind/react";

const Home = () => {
    const [searchText, setSearchText] = useState("")
    const expanded = useOutletContext()
    const { notes, getAllNotes } = useContext(noteContext)
    const [loading, setLoading] = useState(false)

    const getNotes = async () =>{
        setLoading(true)
        await getAllNotes()
        setLoading(false)
    }

    useEffect(() => {
        getNotes()
    }, [])

    return (
            <div className='min-h-[calc(100dvh-4rem)] h-[100dvh-4rem] w-full sm:ml-[60px] lg:ml-0 sm:pl-4 md:px-4  dark:bg-black overflow-y-scroll flex flex-col mt-[4rem]'>
                <div className='flex my-4 justify-between '>
                    <Search searchText={searchText} setSearchText={setSearchText} />
                </div>
                <div className=' flex-1'>
                {
                    loading
                    ?<div className='flex h-full justify-center items-center '>
                        <div className='bg-white dark:bg-gray-900 flex flex-col h-32 w-32 z-50 justify-center items-center rounded-xl gap-3'>
                        <Spinner className="h-12 w-12" />
                        <span className='uppercase font-bold'>Loading..</span>
                        </div>
                    </div>
                    :notes.length === 0
                        ? <div className='flex  justify-center pt-16'>
                            <span className='text-3xl sm:text-5xl font-black text-gray-600 text-center'>
                                What's on your mind....
                            </span>
                        </div>
                        :
                        <div className='w-[90%] flex-1  mx-auto rounded-xl bg-white dark:bg-black sm:p-4 md:p-8 '>
                            <Outlet context={{ searchText, expanded }} />
                        </div>
                }
                </div>
                <div className='justify-end items-end'>
                    <Footer />
                </div>
            </div>
    )
}

export default Home