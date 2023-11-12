import React, { useState, useContext } from 'react'
import noteContext from '../../context/noteContext'
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

const AddModal = ({ open, setOpen }) => {
    const { addNote, notify } = useContext(noteContext);
    const [newNote, setNewNote] = useState({ title: "", description: "", tag: "personal" })
    const [pinned, setPinned] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value
        })
    }

    const onClose = () => {
        setOpen(curr => !curr)
        setPinned(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(newNote.title, newNote.description, newNote.tag, pinned)
        setNewNote({ title: "", description: "", tag: "personal" })
        setPinned(false)
        notify("Note Added", "top-center", 1500);
        setOpen(false)
    };

    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center  items-center transition-colors z-[100] ${open ? "bg-black/60" : "invisible"}`}>
            <div
                onClick={e => e.stopPropagation()}
                className={`bg-white dark:bg-black rounded-xl dark:border-white dark:border-2 shadow transition-all min-w-[50%] p-6 ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} >
                <div className='flex flex-col p-3'>
                    <div className='flex items-center justify-between mb-3'>
                        <input
                            type="text"
                            name='title'
                            placeholder='Title...'
                            className='focus:outline-none p-1 text-2xl dark:bg-black w-full ml-2'
                            value={newNote.title}
                            onChange={handleChange}
                        />
                        <button onClick={() => setPinned(curr => !curr)} className='bg-gray-100 p-1 rounded-md  hover:bg-gray-300 transition-all dark:bg-black dark:hover:bg-gray-900'>{
                            pinned
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
                            <input type="radio" name="tag" id="personal" className='mx-1' onChange={handleChange} value="personal" />
                            <label htmlFor="personal">Personal</label>
                        </div>
                        <div>
                            <input type="radio" name="tag" id="work" className='mx-1' onChange={handleChange} value="work" />
                            <label htmlFor="work">Work</label>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <button onClick={onClose} className='bg-gray-100 p-2 rounded-md hover:bg-gray-300 transition-all dark:bg-black dark:hover:bg-gray-900'>Close</button>
                    <button onClick={handleSubmit} className='bg-gray-100 p-2 rounded-md hover:bg-gray-300 transition-all dark:bg-black dark:hover:bg-gray-900'>Add Note</button>
                </div>
            </div>
        </div>
    )
}

export default AddModal