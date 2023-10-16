import {useState} from 'react'
import AddModal from './Modal/AddModal'

const Search = ({searchText,setSearchText}) => {

    const [open, setOpen] = useState(false)


    return (
        <>
            <div className='shadow-sm rounded-md w-[80%] m-auto border p-1 px-3 bg-white flex'>
                <input 
                className="w-[50%] sm:flex-1 p-2 focus:outline-none"  
                placeholder="Search..."  
                value={searchText} 
                onChange={(e)=>setSearchText(e.target.value)} />
                <button onClick={() => setOpen(curr => !curr)} className='btn bg-black text-white p-2 my-2 hover:ring-white text-sm md:text-lg rounded-lg hover:bg-slate-900' >Take a note</button>
                <AddModal open={open} setOpen={setOpen}/>
            </div>
        </>
    )
}

export default Search