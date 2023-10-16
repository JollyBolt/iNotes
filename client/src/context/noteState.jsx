import { useState } from "react";
import noteContext from "./noteContext";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteState = (props) => {
  
  const [notes, setNotes] = useState([]);
  
  //API Calls to get all notes
  const getAllNotes= async ()=>{
    try {
      // console.log(import.meta.env.VITE_URL)
      const {data} = await axios.get(`${import.meta.env.VITE_URL}/api/notes/fetchallnotes`,{
        headers:{
          "auth-token": localStorage.getItem('token')
        }
      })
      setNotes(data)
    } catch (error) {
      console.log(error)
    }
  }

  //add a note
  const addNote = async (title, description, tag, pinned) => {
    try {
      // console.log(title, description, tag, pinned)
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/notes/addnote`,{
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
    getAllNotes()
  }



  //delete a note
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_URL}/api/notes/deletenote/${id}`,{
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
      await axios.put(`${import.meta.env.VITE_URL}/api/notes/updatenote/${id}`,{
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

  const notify = (msg, position, autoClose) => {
    toast.success(msg, {
      position: position,
      autoClose: 1000,
      theme: document.documentElement.getAttribute('data-bs-theme')
    })
  }


  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getAllNotes,notify }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;