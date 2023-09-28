import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = ({notify}) => {
  const [formState,setFormState] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) =>{
    setFormState(
      {...formState,[e.target.name]:e.target.value}
    )
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    try {
      const {data} = await axios.post('http://localhost:4000/api/auth/createuser',{
        "name":formState.name,
        "email":formState.email,
        "password":formState.password
      },{
        headers:{
          "Content-Type": "application/json"
        }
      })
      
      if(data.success){
        localStorage.setItem("token",data.authToken)
        notify(`Hello, ${data.user.name}`,"top-center",1500)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <Navbar/>
    <div className='container signup w-50 my-5'>
    <p>Sign Up</p>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input onChange={handleChange} type="text" value={formState.name} name='name' className="form-control" id="name"  />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={handleChange} type="email" value={formState.email} name='email' className="form-control" id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={handleChange} type="password" value={formState.password} name='password' className="form-control" id="password" />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
    </>
  )
}

export default SignUp