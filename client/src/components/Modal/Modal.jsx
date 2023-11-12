import React, { useState, useContext } from 'react'
import noteContext from '../../context/noteContext'
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';



const Modal = ({ note, open, setOpen }) => {
    const { editNote,deleteNote, notify } = useContext(noteContext);
    const [newNote, setNewNote] = useState({ ...note })


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(newNote)
        setNewNote({
            ...newNote,
            [name]: value
        })
    }

    const handleDelete = (e) => {
        e.stopPropagation()
        deleteNote(note._id)
        notify("Note Deleted", "bottom-right", 1500)
        setOpen(false)
    }

    const onClose = (e) => {
        e.preventDefault()
        if(JSON.stringify(note)!==JSON.stringify(newNote))
        {
            editNote(note._id,newNote.title, newNote.description, newNote.tag, newNote.pinned)
        }
        setOpen(false)
    };

    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors z-[100] ${open ? "bg-black/60" : "invisible"}`}>
            <div
                onClick={e => e.stopPropagation()}
                className={`bg-white dark:bg-black dark:border-white dark:border-2 rounded-xl shadow-lg transition-all min-w-[50%] p-6 ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} >
                <div className='flex flex-col p-3'>
                    <div className='flex items-center justify-between mb-3'>
                        <input
                            type="text"
                            name='title'
                            placeholder='Title...'
                            className='focus:outline-none p-1 text-2xl dark:bg-black w-full mr-2 '
                            value={newNote.title}
                            onChange={handleChange}
                        />
                        <button onClick={() => setNewNote((newNote)=>({...newNote,pinned:!newNote.pinned}))}
                         className='bg-gray-100 dark:bg-black dark:hover:bg-gray-900 p-1 rounded-md  hover:bg-gray-900 transition-all'>{
                            newNote.pinned
                                ? <PushPinIcon />
                                : <PushPinOutlinedIcon />
                        }</button>
                    </div>
                    <textarea
                        name="description"
                        id="" cols="30"
                        rows="10"
                        placeholder='Take a note...'
                        className='p-1 focus:outline-none dark:bg-black'
                        value={newNote.description}
                        onChange={handleChange}
                    ></textarea>
                    <div className='flex gap-10 justify-center'>
                        <div>
                            <input type="radio" name="tag" id="personal" className='mx-1' onChange={handleChange} value="personal" checked={note.tag==="personal"}/>
                            <label htmlFor="personal">Personal</label>
                        </div>
                        <div>
                            <input type="radio" name="tag" id="work" className='mx-1' onChange={handleChange} value="work" checked={note.tag==="work"}/>
                            <label htmlFor="work">Work</label>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <button onClick={handleDelete} className='bg-gray-100 p-2   rounded-md hover:bg-gray-300 transition-all dark:bg-black dark:hover:bg-gray-900'><DeleteOutlinedIcon /></button>
                    <button onClick={onClose} className='bg-gray-100 dark:bg-black p-2 rounded-md hover:bg-gray-300 transition-all dark:hover:bg-gray-900'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal