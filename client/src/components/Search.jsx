import {useState,useContext} from 'react'
import AddModal from './Modal/AddModal'
import colorContext from "../context/ColorContext";

const Search = ({searchText,setSearchText}) => {
    const {accent} = useContext(colorContext)

    const [open, setOpen] = useState(false)


    return (
        <>
            <div className='shadow-lg w-[95%] sm:w-[80%] m-auto   bg-white flex items-center justify-between dark:bg-black '>
            <div className='py-4 px-3 sm:flex-1 h-full overflow-hidden border-2 dark:border-seperator rounded-md rounded-r-none'>
                <input 
                className="w-[50%] sm:w-full  focus:outline-none dark:bg-black text-xs sm:text-sm md:text-lg"  
                placeholder="Search..."  
                value={searchText} 
                onChange={(e)=>setSearchText(e.target.value)} />
            </div>
            <div className={`border-2 border-${accent}-800 rounded-r-md overflow-hidden`}>
                <button onClick={() => setOpen(curr => !curr)} className={`bg-${accent}-800  font-medium px-2 py-4 text-white dark:text-white hover:ring-white text-xs sm:text-sm md:text-lg h-full rounded-l-none  hover:bg-${accent}-900 `} >Take a note</button>
            </div>
                {/* <button onClick={() => setOpen(curr => !curr)} className='btn bg-black dark:bg-white dark:text-black text-white p-2 my-2 hover:ring-white text-sm md:text-lg rounded-lg hover:bg-slate-900' >Take a note</button> */}
                <AddModal open={open} setOpen={setOpen}/>
            </div>
        </>
    )
}

export default Search