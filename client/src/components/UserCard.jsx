import { useContext } from "react";
import noteContext from '../context/noteContext'

const UserCard = () => {
  const { notes } = useContext(noteContext);

  return (
    <div className="bg-yellow-400 h-[calc(100dvh-4rem)] fixed w-[20vw] top-[4rem] right-0 p-3">
        <div className="border rounded-lg flex flex-col items-center p-3">
            <div className="font-extrabold text-8xl bg-red-600 rounded-full w-28 h-28 flex items-center justify-center border-4">
              <span>J</span>
            </div>
            <p className="text-4xl">Johny</p>
            <p>John Doe</p>
            <p>Total Notes: {notes.length}</p>
            <p>Personal Notes: {notes.filter((note)=>note.tag==="personal").length}</p>
            <p>Work Notes: {notes.filter((note)=>note.tag==="work").length}</p>
        </div>
    </div>
  )
}

export default UserCard