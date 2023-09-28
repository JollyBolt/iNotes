import React from 'react'

const ViewModal = ({modalProp,deleteNote,editModal,notify}) => {
    return (
        <div>
            <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h1>{modalProp.title}</h1>
                            <p>{modalProp.description}</p>
                            <p>{modalProp.tag}</p>
                        </div>
                        <div className="modal-footer">
                            
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" 
                            onClick={()=>{
                                deleteNote(modalProp._id)
                                notify("Note Deleted","top-center",1500)
                                
                            }}>Delete</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>editModal(modalProp)}>Edit</button>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewModal