import { useContext } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import { useOutletContext } from 'react-router-dom';

const AllNotes = () => {
    const { notes } = useContext(noteContext);
    const { searchText, expanded } = useOutletContext()

    return (
        <>
            <div className=''>
                {notes.filter((note) => { return note.pinned === true }).length > 0 && (
                    <>
                        
                        <p className='text-sm font-bold'>PINNED</p>
                        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${expanded ? "lg:grid-cols-2" : "lg:grid-cols-3"} ${expanded?"xl:grid-cols-3":"xl:grid-cols-4"} gap-4`}>
                            {
                                notes.filter((note) => { return note.pinned === true }).filter((note) => { return note.title.toLowerCase().includes(searchText) }).map((note) => {
                                    return <NoteItem key={note._id} note={note} />
                                })
                            }
                        </div>
                        <p className='mt-6 text-sm font-bold'>OTHERS </p>
                    </>
                )}
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${expanded ? "lg:grid-cols-2" : "lg:grid-cols-3"} ${expanded?"xl:grid-cols-3":"xl:grid-cols-4"} gap-4`}>
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