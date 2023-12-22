import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Modal from './Modal/Modal';

const NoteItem = ({ note }) => {
    const { deleteNote, editNote, notify } = useContext(noteContext)
    const [open, setOpen] = useState(false)

    const handleDelete = (e) => {
        e.stopPropagation()
        deleteNote(note._id)
    }

    const handlePin = (e) => {
        e.stopPropagation();
        editNote(note._id, note.title, note.description, note.tag, !note.pinned)
    }

    return (
        <div className='m-1'>
            <div className='group p-4 border-t dark:border  hover:scale-[1.02] ease-in-out transition-all max-h-86 rounded-[10px] shadow-md dark:border-seperator  bg-white dark:bg-black'>
                <div onClick={() => setOpen(curr => !curr)} className='cursor-pointer'>
                    <div className='flex justify-between items-center'>
                        <p className='text-2xl font-bold overflow-hidden '>{note.title}</p>
                        <button onClick={handlePin} className='hover:bg-gray-200 dark:hover:bg-seperator transition-all rounded-md p-1'>
                            {
                                note.pinned
                                    ? <PushPinIcon />
                                    : <PushPinOutlinedIcon />
                            }
                        </button>
                    </div>
                    <span className={`text-xs ${note.tag === "personal" ? "bg-purple-800" : "bg-blue-800"}  p-1 px-2 rounded-lg capitalize text-white`}>{note.tag}</span>
                    <p className='mt-3 max-h-[12.5rem] overflow-hidden text-sm whitespace-pre-wrap '>
                    {note.description.length > 205 ?
                        `${note.description.substring(0, 205)}...` : note.description
                    }
                    </p>
                </div>

                <div className='flex justify-between'>
                    <div className=' pt-6'>
                        <p className='text-xs align-bottom'>{(note.date).split('T')[0]}</p>
                    </div>
                    <button onClick={handleDelete} className='opacity-0 rounded-lg transition-all p-1 group-hover:opacity-100 group-hover:bg-slate-100'>
                        <DeleteOutlinedIcon />
                    </button>
                </div>
            </div>
            <Modal note={note} open={open} setOpen={setOpen} />
        </div>
    )
}

export default NoteItem