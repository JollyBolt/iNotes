import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import { useOutletContext } from 'react-router-dom';


const WorkNotes = () => {
    const { notes, getAllNotes } = useContext(noteContext);
    const {searchText,expanded} = useOutletContext()
    useEffect(() => {
        getAllNotes()
    }, [])

    return (
        <>
            <p className='text-4xl font-bold'>Work Notes</p>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${expanded ? "lg:grid-cols-2" : "lg:grid-cols-3"} ${expanded?"xl:grid-cols-3":"xl:grid-cols-4"} gap-4`}>
                {
                    notes.filter(((note) => { return note.tag === "work" })).filter((note) => { return note.title.toLowerCase().includes(searchText) }).map((note) => {
                        return <NoteItem key={note._id} note={note}  />
                    })
                }
            </div>
        </>
    )
}

export default WorkNotes