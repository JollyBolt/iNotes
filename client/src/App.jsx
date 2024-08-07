import './App.css'
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import NoteState from "./context/NoteState"
import { ToastContainer } from "react-toastify"
import Settings from "./pages/Settings"
import RootLayout from "./layouts/RootLayout"
import PersonalNotes from "./components/PersonalNotes"
import WorkNotes from "./components/WorkNotes"
import AllNotes from "./components/AllNotes"
import { ColorState } from "./context/ColorContext"
import { useContext } from "react"
import userContext from "./context/userContext"

const App = () => {
  const { user } = useContext(userContext)

  return (
    <>
      <NoteState>
        <ColorState>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="login" />}
              >
                <Route index element={<AllNotes />}></Route>
                <Route path="personal" element={<PersonalNotes />}></Route>
                <Route path="work" element={<WorkNotes />}></Route>
              </Route>
              <Route path="settings" element={<Settings />}></Route>
            </Route>
            <Route
              path="signup"
              element={user ? <Navigate to="/" /> : <SignUp />}
            ></Route>
            <Route
              path="login"
              element={user ? <Navigate to="/" /> : <Login />}
            ></Route>
          </Routes>
        </ColorState>
      </NoteState>
      <ToastContainer />
    </>
  )
}

export default App