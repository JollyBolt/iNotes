import React, { useContext,useState, useRef } from 'react'
import noteContext from '../context/noteContext'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const NoteItem = ({ note, setNotes, viewModal, editModal, notify }) => {
    const { deleteNote, editNote } = useContext(noteContext)
    const [open, setOpen] = useState(false)

    const handleDelete = (e) => {
        e.stopPropagation()
        deleteNote(note._id)
        notify("Note Deleted", "top-center", 1500)
    }
    const handleEdit = (e) => {
        e.stopPropagation()
        editModal(note)
    }
    const handlePin = (e) => {
        e.stopPropagation();
        editNote(note._id, note.title, note.description, note.tag, !note.pinned)
    }

    return (
        // <div className="card m-2" style={{ width: "18rem" }}>
        //     <div className="card-body" role='button' onClick={() => viewModal(note)}>
        //         <div>
        //             <h2 className="card-title"  >{note.title}</h2>
        //             {
        //                 note.pinned ?
        //                     <div onClick={handlePin}>
        //                         <PushPinIcon />
        //                     </div>
        //                     :
        //                     <div onClick={handlePin}>
        //                         <PushPinOutlinedIcon />
        //                     </div>
        //             }
        //         </div>
        //         <p className="card-text">{note.description}</p>
        //         <p>Tag:{note.tag}</p>
        //         <i className="fa-sharp fa-solid fa-trash mx-2" onClick={handleDelete}></i>
        //         <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEdit}></i>
        //     </div>
        // </div>
        <div className='p-10'>
            <div className='group p-4 border w-52 shadow-md max-h-86 rounded-lg '>
                <div onClick={() => setOpen(curr => !curr)} className='cursor-pointer'>
                    <div className='flex justify-between items-center'>
                        <p className='text-2xl font-bold'>{note.title}</p>
                        <button onClick={handlePin} className='hover:bg-gray-200 transition-all rounded-md p-1'>
                        {
                            note.pinned
                            ?<PushPinIcon/>
                            :<PushPinOutlinedIcon />
                        }
                        </button>
                    </div>
                    <span className={`text-xs ${note.tag==="personal"?"bg-purple-800":"bg-blue-800"}  p-1 rounded-lg text-white`}>{note.tag}</span>
                    <p className='mt-3 max-h-[12.5rem] overflow-hidden text-sm'>{note.description}</p>
                    {note.description.length > 206 ? "..." : ""}
                </div>
                <div className='flex justify-end'>
                    <button className='opacity-0 rounded-lg transition-all p-1 group-hover:opacity-100 group-hover:bg-slate-100'>
                        <DeleteOutlinedIcon />
                    </button>
                </div>
            </div>
            {/* <Modal open={open} onClose={() => setOpen(curr => !curr)} /> */}
        </div>
    )
}

export default NoteItem