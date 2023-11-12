import {useContext, useState} from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import userContext from '../context/userContext';
import colorContext from '../context/ColorContext';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Navbar = ({setExpanded}) => {
  const {setUser} = useContext(userContext)

  const {theme,accent} = useContext(colorContext)

  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <>
      <div className={`h-[4rem] shadow-sm flex fixed w-[100vw] top-0 bg-white dark:bg-black z-50 justify-between items-center dark:border-seperator dark:border-b pr-4`}>
        <div className="flex pl-4 pt-4 sm:p-4 pb-2" >
          <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-seperator">
            <MenuOutlinedIcon sx={{ color: theme==='dark'?'white':'black' }} />
          </button>
        </div>
        <NavLink to="/" className='flex items-center'>
          <img src="/logo.png" alt="logo" className='h-[3rem]'/>
          <span className='font-[Avant-garde-gothic] dark:text-white sm:text-5xl font-black hidden sm:block'>iNotes</span>
        </NavLink>
        {!localStorage.getItem('token') ?
          <div>
            <Link to='/signup'><button className="btn  mx-2" type="button"> Sign Up</button></Link>
            <Link to='/login'><button className="btn " type="button">Login</button></Link>
          </div>
          :
          <button onClick={handleLogout} className={`ml-1 p-2 border border-red-500 rounded-lg   flex justify-center  transition-all mr-2 text-red-500`}>
                        <span className='hidden sm:block' >Logout</span>
                        <span className='sm:hidden'><PowerSettingsNewIcon/></span>
                    </button>
        }
      </div>
      
    </>
  )
}

export default Navbar