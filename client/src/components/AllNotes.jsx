import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import ViewModal from './Modal/ViewModal';
import EditModal from './Modal/EditModal';
import { useOutletContext } from 'react-router-dom';

const AllNotes = () => {
    const { notes, setNotes, getAllNotes, deleteNote, editNote } = useContext(noteContext);

    const { searchText, notify } = useOutletContext()
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
            {/* <p className='text-4xl font-bold'>Your Notes</p> */}
            <div className=''>
            {notes.filter((note) => { return note.pinned === true }).length>0 && (
                <>
            <p className='text-sm font-bold'>PINNED</p>
                <div className='flex flex-wrap'>
                    {
                        notes.filter((note) => { return note.pinned === true }).filter((note) => { return note.title.toLowerCase().includes(searchText) }).map((note) => {
                            return <NoteItem key={note._id} note={note} />
                        })
                    }
                </div>
                <p className='text-sm font-bold'>OTHERS </p>
                </>
            )}
                <div className='flex flex-wrap '>
                    {
                        notes.filter(((note) => { return note.pinned === false })).filter((note) => { return note.title.toLowerCase().includes(searchText) }).map((note) => {
                            return <NoteItem key={note._id} note={note} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default AllNotes