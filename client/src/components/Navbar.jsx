import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top tw-h-[4rem]">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">iNotes</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </ul>
            {!localStorage.getItem('token') ?
              <>
                <Link to='/signup'><button className="btn btn-outline-success mx-2" type="button"> Sign Up</button></Link>
                <Link to='/login'><button className="btn btn-outline-success" type="button">Login</button></Link>
              </>
              :
              <button onClick={handleLogout} className="btn btn-outline-success" type="button">Logout</button>
            }
            
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar