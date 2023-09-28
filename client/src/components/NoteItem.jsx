import React, { useContext,useRef } from 'react'
import noteContext from '../context/noteContext'

const NoteItem = ({note,viewModal,editModal,notify}) => {
    const {deleteNote} = useContext(noteContext)

    const handleDelete = (e)=>{
        e.stopPropagation()
        deleteNote(note._id)
        notify("Note Deleted","top-center",1500)
    }
    const handleEdit = (e)=>{
        e.stopPropagation()
        editModal(note)   
    }

    return (
        <div  className="card m-2" style={{ width: "18rem" }}>
            <div className="card-body" role='button' onClick={()=>viewModal(note)}>
                <h2 className="card-title"  >{note.title}</h2>
                <p className="card-text">{note.description}</p>
                <p>Tag:{note.tag}</p>
                <i className="fa-sharp fa-solid fa-trash mx-2" onClick={handleDelete}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEdit}></i>
            </div>
        </div>
    )
}

export default NoteItem