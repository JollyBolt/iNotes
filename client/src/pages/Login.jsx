import React, { useState, useContext } from 'react'
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



const Login = () => {
  const { handleUser } = useContext(userContext)
  const [formState, setFormState] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormState(
      { ...formState, [e.target.name]: e.target.value }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/auth/login`, {
        "email": formState.email,
        "password": formState.password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (data.success) {
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        handleUser(data.user)
        setLoading(false)
        navigate('/')
        setErrorMsg('')
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
        <Card color="white" shadow={false} className='relative border m-auto p-8 shadow-card dark:shadow-none'>
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
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to sign in.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
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
              Sign In
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <a href="/signup" className="font-medium text-gray-900">
                Sign Up
              </a>
            </Typography>
          
          <div className='text-center'>

            Here to check out the site:&nbsp; 
            <button 
            type='button'
            onClick={()=>setFormState({
              email:'demo@gmail.com',
              password:'demodemo'
            })}>
              Click Here
            </button>
          </div>
          {/* <div className='text-center text-xs mt-5'>
            Note: The server is hosted on free plan of render.com which spins down on inactivity. So logging in the 1st time might take upto <b>30s</b>. Please bear with it. Thank you for your cooperation. 
          </div> */}
          </form>
        </Card>
      </div>
    </>
  )
}

export default Login