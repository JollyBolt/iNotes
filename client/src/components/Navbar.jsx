import {useState} from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Navbar = ({setExpanded}) => {
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <div className='h-[4rem] shadow-sm flex sticky top-0 bg-white z-50 justify-between items-center'>
        <div className="p-4 pb-2 ml-1" >
          <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg hover:bg-gray-50">
            <MenuOutlinedIcon />
          </button>
        </div>
        <NavLink to="/"><span className='font-[Avant-garde-gothic] text-5xl font-black'>iNotes</span></NavLink>
        {!localStorage.getItem('token') ?
          <>
            <Link to='/signup'><button className="btn  mx-2" type="button"> Sign Up</button></Link>
            <Link to='/login'><button className="btn " type="button">Login</button></Link>
          </>
          :
          <button onClick={handleLogout} className={`ml-1 p-2 border border-red-500 rounded-lg   flex justify-center  transition-all mr-2 text-red-500`}>
                        <span>Logout</span>
                    </button>
        }
      </div>
      
    </>
  )
}

export default Navbar