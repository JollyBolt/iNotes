import React, { useEffect, useState } from 'react'

const EditModal = ({modalProp,editNote,notify}) => {
    const [note,setNote] = useState({})

    useEffect(() => {
      setNote(modalProp)
    }, [modalProp])
    
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleSubmit = () =>{
        editNote(note._id,note.title,note.description,note.tag)
        notify("Note Updated","top-center",1500)
    }    
    return (
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="editModalLabel">Edit Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form className=''>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" name='title' id="title" placeholder="" value={note.title} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <textarea className="form-control" id="desc" name='description' rows="8" value={note.description} onChange={handleChange}></textarea>
                                </div>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="tag" 
                                        id="personalRadio" 
                                        value="personal" 
                                        onChange={handleChange} 
                                        checked={note.tag==="personal"}
                                        />
                                        <label className="form-check-label" htmlFor="personalRadio">Personal</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="tag" id="workRadio" value="work" onChange={handleChange} checked={note.tag==="work"}/>
                                        <label className="form-check-label" htmlFor="workRadio">Work</label>
                                    </div>
                                </div>
                            </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal