import { useState } from 'react'
import AddModal from '../components/Modal/AddModal';
import Notes from '../components/Notes';
import Search from '../components/Search';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';
import Sidebar from '../components/Sidebar';


const Home = ({ notify }) => {
    const [searchText, setSearchText] = useState("")

    return (
        <>
            <Navbar />
            <div className='row'>
                <div className='col'>
                    <Sidebar/>
                </div>
                <div className='col-7'>
                    <div className=' w-100 mx-auto '>
                        <div className='d-flex my-4 justify-content-between'>
                            <Search searchText={searchText} setSearchText={setSearchText} />
                            <AddModal notify={notify} />
                        </div>
                        <Notes searchText={searchText} notify={notify} />
                    </div>
                </div>
                <div className='col'>
                    <UserCard />
                </div>

            </div>

        </>
    )
}

export default Home