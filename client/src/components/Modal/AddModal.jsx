import React, { useState, useContext } from 'react'
import noteContext from '../../context/noteContext'
import { ToastContainer } from 'react-toastify';

const AddModal = ({ notify }) => {
    const { addNote } = useContext(noteContext);
    const [newNote, setNewNote] = useState({ title: "", description: "", tag: "personal" })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(newNote.title, newNote.description, newNote.tag)
        setNewNote({ title: "", description: "", tag: "personal" })
        notify("Note Added", "top-center", 1500);
    };

    return (
        <div>
            <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#addModal">
                Take a note
            </button>

            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addModalLabel">Add a Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className=''>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" name='title' id="title" placeholder="Random Title" value={newNote.title} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <textarea className="form-control" id="desc" name='description' rows="8" value={newNote.description} onChange={handleChange} required />
                                </div>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="tag" id="personalRadio" value="personal" onChange={handleChange} checked />
                                        <label className="form-check-label" htmlFor="personalRadio">Personal</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="tag" id="workRadio" value="work" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="workRadio">Work</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddModal