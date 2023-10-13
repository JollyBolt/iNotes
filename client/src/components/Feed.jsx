import { useState } from 'react'
import Notes from '../components/Notes';
import Search from '../components/Search';
import AddModal from './Modal/AddModal';

const Feed = ({ notify }) => {
    const [searchText, setSearchText] = useState("")

    return (
        <div className='w-[70vw] ml-[100px] '>
            <div className='flex my-4 justify-between '>
                <Search searchText={searchText} setSearchText={setSearchText} />
                <AddModal notify={notify} />
            </div>
            <Notes searchText={searchText} notify={notify} />
        </div>
    )
}

export default Feed