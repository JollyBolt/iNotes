import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import { useOutletContext } from 'react-router-dom';


const PersonalNotes = () => {
    const { notes, setNotes, getAllNotes, deleteNote, editNote } = useContext(noteContext);
    const {searchText,notify} = useOutletContext()
    useEffect(() => {
        getAllNotes()
    }, [])
    const viewRef = useRef(null)
    const editRef = useRef(null)

    const [modalProp, setModalProp] = useState({})

    const viewModal = (note) => {
        setModalProp(note)
        viewRef.current.click()
    }
    const editModal = (note) => {
        setModalProp(note)
        editRef.current.click()
    }
    return (
        <>
            <p className='text-4xl font-bold'>Personal Notes</p>
            {/* <p>Pinned</p> */}
            <div className='flex flex-wrap  '>
                {
                    notes.filter(((note) => { return note.tag === "personal" })).filter((note) => { return note.title.toLowerCase().includes(searchText) }).map((note) => {
                        return <NoteItem key={note._id} note={note} setNotes={setNotes} viewModal={viewModal} editModal={editModal} editNote={editNote} notify={notify} />
                    })
                }
            </div>
        </>
    )
}

export default PersonalNotes