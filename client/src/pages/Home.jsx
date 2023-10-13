import { useState } from 'react'
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';
import Sidebar from '../components/Sidebar';


const Home = ({ notify }) => {
    const [searchText, setSearchText] = useState("")

    return (
        <>
            <Navbar />
            <div className='flex relative'>
                <Sidebar/>
                <Feed notify={notify}/>
                <UserCard/>
            </div>
        </>
    )
}

export default Home