import { useState } from "react";
import noteContext from "./noteContext";
import axios from 'axios'

const NoteState = (props) => {
  
  const [notes, setNotes] = useState([]);
  
  //API Calls to get all notes
  const getAllNotes= async ()=>{
    try {
      const {data} = await axios.get('http://localhost:4000/api/notes/fetchallnotes',{
        headers:{
          "auth-token": localStorage.getItem('token')
        }
      })
      setNotes(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  //add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await axios.post('http://localhost:4000/api/notes/addnote',{
        "title":title,
        "description":description,
        "tag":tag
      },
      {
        headers:{
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json"
        }
      })
      
    } catch (error) {
      console.log(error.response)
    }
    getAllNotes()
  }



  //delete a note
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/notes/deletenote/${id}`,{
        headers:{
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json"
        }
      })
    } catch (error) {
      console.log(error.response)
    }
    setNotes(notes.filter((note) => note._id !== id ))
  }


  //edit a note
  const editNote = async (id, title, description, tag, pinned) => {
    try {
      await axios.put(`http://localhost:4000/api/notes/updatenote/${id}`,{
        "title":title,
        "description":description,
        "tag":tag,
        "pinned":pinned
      },
      {
        headers:{
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json"
        }
      })
    } catch (error) {
      console.log(error.response)
    }
    getAllNotes()//Final notes are updating on frontend through api call
    //TODO: update notes on frontend without api call
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getAllNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;