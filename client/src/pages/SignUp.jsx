import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import userContext from '../context/userContext';

const SignUp = () => {
  const [formState, setFormState] = useState({})
  const { handleUser } = useContext(userContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormState(
      { ...formState, [e.target.name]: e.target.value }
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState)
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/auth/createuser`, {
        "firstName": formState.firstName,
        "lastName": formState.lastName,
        "email": formState.email,
        "password": formState.password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (data.success) {
        localStorage.setItem("token", data.authToken)
        localStorage.setItem("user", JSON.stringify(data.user))
        handleUser()
        // notify(`Hello, ${data.user.name}`, "top-center", 1500)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className=' flex h-screen'>
        <Card color="white" shadow={false} className='border m-auto p-8 shadow-card dark:shadow-none'>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="First Name" name='firstName' value={formState.firstName} onChange={handleChange} />
              <Input size="lg" label="Last Name" name='lastName' value={formState.lastName} onChange={handleChange} />
              <Input size="lg" label="Email" name='email' value={formState.email} onChange={handleChange} />
              <Input type="password" size="lg" label="Password" name='password' value={formState.password} onChange={handleChange} />
            </div>
            {/*  */}
            <Button className="mt-6" fullWidth onClick={handleSubmit}>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  )
}

export default SignUp