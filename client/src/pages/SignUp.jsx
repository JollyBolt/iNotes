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
import { Spinner } from "@material-tailwind/react";


const SignUp = () => {
  const [formState, setFormState] = useState({})
  const { handleUser } = useContext(userContext)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormState(
      { ...formState, [e.target.name]: e.target.value }
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
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
        setLoading(false)
        setErrorMsg('')
        navigate('/')
      }
      else {
        setErrorMsg(data.error)
        setLoading(false)
      }
    } catch (error) {
      setErrorMsg(error.response.data)
      setLoading(false)
    }
  }
  return (
    <>
      <div className=' flex h-screen'>
        <Card color="white" shadow={false} className='border m-auto p-8 shadow-card dark:shadow-none'>
          {
            loading && (
              <div className='inset-0 absolute flex justify-center items-center bg-black/40 z-10 '>
                <div className='bg-white flex flex-col h-32 w-32 z-50 justify-center items-center rounded-xl gap-3'>
                  <Spinner className="h-12 w-12" />
                  <span className='uppercase font-bold'>Loading..</span>
                </div>
              </div>
            )
          }
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
            {
              errorMsg !== ''
                ? <>
                  <div className='text-red-700 text-center bg-red-100 border border-red-700 p-2 font-extrabold rounded-lg'>
                    {errorMsg}
                  </div>
                </>
                : ""
            }
            <Button className="mt-6" fullWidth onClick={handleSubmit}>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography>
          {/* <div className='text-center text-xs mt-5'>
            Note: The server is hosted on free plan of render.com which spins down on inactivity. So signing up the 1st time might take upto <b>30s</b>. Please bear with it. Thank you for your cooperation. 
          </div> */}
          </form>
        </Card>
      </div>
    </>
  )
}

export default SignUp