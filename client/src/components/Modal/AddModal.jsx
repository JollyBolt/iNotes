import React, { useState, useContext } from 'react'
import noteContext from '../../context/noteContext'
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';



const AddModal = ({ open, setOpen }) => {
    const { addNote, notify } = useContext(noteContext);
    const [newNote, setNewNote] = useState({ title: "", description: "", tag: "personal" })
    // const [open, setOpen] = useState(false)
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
        // console.log(newNote.title, newNote.description, newNote.tag, pinned)
        addNote(newNote.title, newNote.description, newNote.tag, pinned)
        setNewNote({ title: "", description: "", tag: "personal" })
        setPinned(false)
        notify("Note Added", "top-center", 1500);
        setOpen(false)
    };

    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors z-[100] ${open ? "bg-black/40" : "invisible"}`}>
            <div
                onClick={e => e.stopPropagation()}
                className={`bg-white rounded-xl shadow transition-all min-w-[50%] p-6 ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} >
                <div className='flex flex-col p-3'>
                    <div className='flex items-center justify-between mb-3'>
                        <input
                            type="text"
                            name='title'
                            placeholder='Title...'
                            className='focus:outline-none p-1 text-2xl'
                            value={newNote.title}
                            onChange={handleChange}
                        />
                        <button onClick={() => setPinned(curr => !curr)} className='bg-gray-100 p-1 rounded-md  hover:bg-gray-300 transition-all'>{
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
                        className='p-1 focus:outline-none'
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
                    {/* <button className='bg-gray-100 p-2 rounded-md hover:bg-gray-300 transition-all'><DeleteOutlinedIcon /></button> */}
                    <button onClick={onClose} className='bg-gray-100 p-2 rounded-md hover:bg-gray-300 transition-all'>Close</button>
                    <button onClick={handleSubmit} className='bg-gray-100 p-2 rounded-md hover:bg-gray-300 transition-all'>Add Note</button>
                </div>
            </div>
        </div>
    )
}

export default AddModal