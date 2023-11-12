import {useState,useContext} from 'react'
import AddModal from './Modal/AddModal'
import colorContext from "../context/ColorContext";

const Search = ({searchText,setSearchText}) => {
    const {accent} = useContext(colorContext)

    const [open, setOpen] = useState(false)


    return (
        <>
            <div className='shadow-lg mb-6 rounded-md w-[95%] sm:w-[80%] m-auto border-2 p-1 px-3 bg-white flex justify-between dark:bg-black dark:border-seperator'>
                <input 
                className="w-[50%] sm:flex-1 sm:p-2 focus:outline-none dark:bg-black"  
                placeholder="Search..."  
                value={searchText} 
                onChange={(e)=>setSearchText(e.target.value)} />
                {/* <button onClick={() => setOpen(curr => !curr)} className='btn bg-black dark:bg-white dark:text-black text-white p-2 my-2 hover:ring-white text-sm md:text-lg rounded-lg hover:bg-slate-900' >Take a note</button> */}
                <button onClick={() => setOpen(curr => !curr)} className={`btn bg-gradient-to-b from-${accent}-400 to-${accent}-700 dark:from-${accent}-200 dark:to-${accent}-700 font-extrabold p-2 my-2 text-white dark:text-black hover:ring-white text-xs sm:text-sm md:text-lg rounded-lg hover:bg-slate-900`} >Take a note</button>
                <AddModal open={open} setOpen={setOpen}/>
            </div>
        </>
    )
}

export default Search