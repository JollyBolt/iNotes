import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

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
      const {data} = await axios.post(`${import.meta.env.VITE_URL}/api/auth/createuser`,{
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
    <div className='bg-green-200'>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Name" />
          <Input size="lg" label="Email" />
          <Input type="password" size="lg" label="Password" />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
    </div>
    {/* <div className='container signup w-50 my-5'>
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
    </div> */}
    </>
  )
}

export default SignUp