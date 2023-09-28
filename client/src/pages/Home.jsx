import React, { useState } from 'react'
import AddModal from '../components/Modal/AddModal';
import Notes from '../components/Notes';
import Search from '../components/Search';
import Navbar from '../components/Navbar';


const Home = ({notify}) => {
    const [searchText, setSearchText] = useState("")

    return (
        <>
            <Navbar />
            <div className='container w-75 mx-auto '>
                <div className='d-flex my-4 justify-content-between'>
                    <Search searchText={searchText} setSearchText={setSearchText} />
                    <AddModal notify={notify}/>
                </div>
                <Notes searchText={searchText} notify={notify}/>
            </div>
        </>
    )
}

export default Home