import { useEffect, useState } from "react";
import noteContext from "./noteContext";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteState = (props) => {
  
  const [notes, setNotes] = useState([]);

  //API Calls to get all notes
  const getAllNotes= async ()=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_URL}/api/notes/fetchallnotes`,{
        headers:{
          "auth-token": localStorage.getItem('token')
        }
      })
      setNotes(data)
    } catch (error) {
      notifyError(error.response.data,"top-center")
    }
  }

  //add a note
  const addNote = async (title, description, tag, pinned) => {
    try {
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
      setNotes([...notes,{title:title,description:description,tag:tag,pinned:pinned,date:new Date().toISOString()}])
      notify("Note Added", "top-center");
      
    } catch (error) {
      notifyError(error.response.data,"top-center")
    }
    

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
      setNotes(notes.filter((note) => note._id !== id ))
      notify("Note Deleted", "bottom-right")
    } catch (error) {
      notifyError(error.response.data,"top-center")
    }
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
      setNotes(current => current.map(note=>{
        if(note._id===id){
          return {
            ...note,
            title:title,
            description:description,
            tag:tag,
            pinned:pinned
          }
        }
        return note
      }))
    } catch (error) {
      notifyError(error.response.data,"top-center")
    }
  }

  const notify = (msg, position) => {
    toast.success(msg, {
      position: position,
      autoClose: 500,
      theme: localStorage.getItem('color-theme')
    })
  }
  const notifyError = (msg, position) => {
    toast.error(msg, {
      position: position,
      autoClose: 500,
      theme: localStorage.getItem('color-theme')
    })
  }


  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getAllNotes,notify,notifyError }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;