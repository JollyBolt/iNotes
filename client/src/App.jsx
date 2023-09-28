import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import About from './pages/About'
import NoteState from './context/noteState'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const notify = (msg,position,autoClose) => {
    toast.success(msg,{
    position: position,
    autoClose: 1000,
    theme:document.documentElement.getAttribute('data-bs-theme')
})};
  return (
    <>
      <NoteState>
        <Routes>
          <Route path='/' element={<Home notify={notify}/>}></Route>
          <Route path='/about' element={<About />}></Route>        
          <Route path='/signup' element={<SignUp notify={notify}/>}></Route>
          <Route path='/login' element={<Login notify={notify}/>}></Route>
        </Routes>
      </NoteState>
      <ToastContainer/> 
    </>
  )
}

export default App