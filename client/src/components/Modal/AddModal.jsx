import React, { useState, useContext } from 'react'
import noteContext from '../../context/noteContext'
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


const AddModal = ({ notify }) => {
    const { addNote } = useContext(noteContext);
    const [newNote, setNewNote] = useState({ title: "", description: "", tag: "personal" })
    const [open, setOpen] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value
        })
    }

    const onClose=()=>setOpen(curr=>!curr)

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(newNote.title, newNote.description, newNote.tag)
        setNewNote({ title: "", description: "", tag: "personal" })
        notify("Note Added", "top-center", 1500);
    };

    return (
        <div>
            <button type="button" onClick={() => setOpen(curr => !curr)} className="btn  " >
                Take a note
            </button>

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
                                value={newNote.title} onChange={handleChange}
                            />
                            <button className='bg-gray-100 p-1 rounded-md  hover:bg-gray-300 transition-all'><PushPinOutlined /></button>
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
                        <button className='bg-gray-100 p-2 rounded-md hover:bg-gray-300 transition-all'><DeleteOutlinedIcon /></button>
                        <button onClick={onClose} className='bg-gray-100 p-2 rounded-md hover:bg-gray-300 transition-all'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddModal