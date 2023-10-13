import React, { useContext, useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import ViewModal from './Modal/ViewModal';
import EditModal from './Modal/EditModal';

const Notes = ({ searchText, notify }) => {
    const { notes, setNotes, getAllNotes, deleteNote, editNote } = useContext(noteContext);

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
            {/* <Routes>
                <Route path='/' element={
                    <>
                        <p className='text-4xl font-bold'>Your Notes</p>
                        <p>Pinned</p>
                        <div className='flex flex-wrap justify-evenly '>
                            {
                                notes.filter(((note) => { return note.pinned === true })).filter((note) => { return note.title.toLowerCase().includes(searchText) }).map((note) => {
                                    return <NoteItem key={note._id} note={note} setNotes={setNotes} viewModal={viewModal} editModal={editModal} editNote={editNote} notify={notify} />
                                })
                            }
                        </div>
                        <p>Others</p>
                        <div className='d-flex flex-wrap justify-content-evenly'>
                            {
                                notes.filter(((note) => { return note.pinned === false })).filter((note) => { return note.title.toLowerCase().includes(searchText) }).map((note) => {
                                    return <NoteItem key={note._id} note={note} setNotes={setNotes} viewModal={viewModal} editModal={editModal} editNote={editNote} notify={notify} />
                                })
                            }
                        <div/>
                        </>           
                }</Route>
                    <Route path='/personal' element={
                        <>

                        </>
                    }></Route>
                    <Route path='/work' element={
                        <>

                        </>
                    }></Route>

            </Routes> */}
            <p className='text-4xl font-bold'>Your Notes</p>
            <p>Pinned</p>
            <div className='flex flex-wrap justify-evenly '>
                {
                    notes.filter(((note) => { return note.pinned === true })).filter((note) => { return note.title.toLowerCase().includes(searchText) }).map((note) => {
                    return <NoteItem key={note._id} note={note} setNotes={setNotes} viewModal={viewModal} editModal={editModal} editNote={editNote} notify={notify} />
                    })
                }
            </div>
            <p>Others</p>
            <div className='flex flex-wrap justify-evenly'>
                {
                    notes.filter(((note) => { return note.pinned === false })).filter((note) => { return note.title.toLowerCase().includes(searchText) }).map((note) => {
                    return <NoteItem key={note._id} note={note} setNotes={setNotes} viewModal={viewModal} editModal={editModal} editNote={editNote} notify={notify} />
                })
                }

            <button ref={viewRef} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewModal" />

            <button ref={editRef} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" />

            <ViewModal modalProp={modalProp} deleteNote={deleteNote} editModal={editModal} notify={notify} />
            <EditModal modalProp={modalProp} editNote={editNote} notify={notify} />
        </div >
        </>
    )
}

export default Notes