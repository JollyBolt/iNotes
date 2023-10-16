import { useState } from 'react'
import Search from '../components/Search';
import { Outlet } from 'react-router-dom';

const Home = () => {
    const [searchText, setSearchText] = useState("")

    return (
        <div className='h-[100vh-4rem] w-full ml-[60px] lg:ml-0 px-10 bg-blue-gray-50 overflow-y-scroll'>
            <div className='flex my-4 justify-between '>
                <Search searchText={searchText} setSearchText={setSearchText}  />
            </div>
            <div className='w-[90%] mx-auto rounded-md bg-blue-gray-300'>
                <Outlet context={{searchText}} />
            </div>
        </div>
    )
}

export default Home