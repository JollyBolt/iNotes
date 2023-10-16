import React, { useContext,useState } from 'react'
import noteContext from '../context/noteContext'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Modal from './Modal/Modal';

const NoteItem = ({ note }) => {
    const { deleteNote, editNote,notify } = useContext(noteContext)
    const [open, setOpen] = useState(false)
    
    const handleDelete = (e) => {
        e.stopPropagation()
        deleteNote(note._id)
        notify("Note Deleted", "bottom-right", 1500)
    }

    const handlePin = (e) => {
        e.stopPropagation();
        editNote(note._id, note.title, note.description, note.tag, !note.pinned)
    }

    return (
        <div className='m-1'>
            <div className='group p-4 border w-52 shadow-md max-h-86 rounded-lg bg-white '>
                <div onClick={() => setOpen(curr => !curr)} className='cursor-pointer'>
                    <div className='flex justify-between items-center'>
                        <p className='text-2xl font-bold overflow-hidden '>{note.title}</p>
                        <button onClick={handlePin} className='hover:bg-gray-200 transition-all rounded-md p-1'>
                        {
                            note.pinned
                            ?<PushPinIcon/>
                            :<PushPinOutlinedIcon />
                        }
                        </button>
                    </div>
                    <span className={`text-xs ${note.tag==="personal"?"bg-purple-800":"bg-blue-800"}  p-1 rounded-lg text-white`}>{note.tag}</span>
                    <p className='mt-3 max-h-[12.5rem] overflow-hidden text-sm whitespace-pre-wrap '>{note.description}</p>
                    {note.description.length > 206 ? "..." : ""}
                </div>
                <div className='flex justify-end'>
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