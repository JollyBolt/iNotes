import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import ViewModal from './Modal/ViewModal';
import EditModal from './Modal/EditModal';

const Notes = ({searchText,notify}) => {
    const { notes, getAllNotes, deleteNote, editNote } = useContext(noteContext);

    useEffect(() => {
        getAllNotes()
    }, [])

    const viewRef = useRef(null)
    const editRef = useRef(null)

    const [modalProp, setModalProp] = useState({})

    const viewModal =(note) => {
        setModalProp(note)
        viewRef.current.click()
    }
    const editModal = (note) => {
        setModalProp(note)
        editRef.current.click()
    }

    return (
        <>
            <h1>Your Notes</h1>
            <div className='d-flex flex-wrap justify-content-evenly'>
                {notes.filter((note)=>{return note.title.toLowerCase().includes(searchText)}).map((note) => {
                    return <NoteItem key={note._id} note={note} viewModal={viewModal} editModal={editModal} editNote={editNote} notify={notify}/>
                })}
                <button ref={viewRef} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewModal"/>
                    
                <button ref={editRef} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal"/>

                <ViewModal modalProp={modalProp} deleteNote={deleteNote} editModal={editModal} notify={notify}/>
                <EditModal modalProp={modalProp}  editNote={editNote} notify={notify}/>
            </div>
        </>
    )
}

export default Notes