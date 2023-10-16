import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import NoteState from './context/noteState'
import { ToastContainer } from 'react-toastify';
import Settings from './pages/Settings'
import RootLayout from './layouts/RootLayout'
import PersonalNotes from './components/PersonalNotes'
import WorkNotes from './components/WorkNotes'
import AllNotes from './components/AllNotes'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootLayout />}>
        <Route path='/' element={<Home />}>
          <Route path='/' element={<AllNotes />}></Route>
          <Route path='/personal' element={<PersonalNotes />}></Route>
          <Route path='/work' element={<WorkNotes />}></Route>
        </Route>
        <Route path='/settings' element={<Settings />}></Route>
      </Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/login' element={<Login  />}></Route>
    </>
  )
)

const App = () => {
  return (
    <>
      <NoteState>
        <RouterProvider router={router}/>
      </NoteState>
      <ToastContainer />
    </>
  )
}

export default App