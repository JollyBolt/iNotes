import React, { useContext } from 'react'
import ColorCard from '../components/ColorCard'
import colorContext from '../context/ColorContext'
import Footer from '../components/Footer'


const Settings = () => {
  const {accentColors} = useContext(colorContext)
  // console.log(accentColors)
  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
    <div className='min-h-[calc(100vh-4rem)] h-[100vh-4rem] w-[calc(100vw-70px)] ml-[70px] lg:ml-0 sm:px-4 dark:bg-black overflow-y-scroll mt-[4rem] flex flex-col '>     
      <div className='sm:justify-center justify-start items-start p-4 pt-10 flex-1'> 
            <div className='w-[100%]  rounded-xl bg-white dark:bg-black  p-4 sm:p-8 shadow-[6px_6px_12px_rgb(201,203,205),-6px_-6px_12px_rgb(255,255,255)] dark:shadow-none'>
               <p className='font-black text-2xl lg:text-3xl '>Profile</p>
               <div className='sm:ml-7 mt-2'>
                    <div className='flex mt-3 items-center'>
                      <span className='w-24'>First Name:</span>
                      <span className='sm:text-2xl font-extrabold'>{user.firstName}</span> 
                    </div>
                    <div className='flex mt-3 items-center' >
                      <span className='w-24'>Last Name:</span> 
                      <span className='sm:text-2xl font-extrabold'>{user.lastName}</span>
                    </div>
                    <div className='flex mt-3 items-center flex-wrap'>
                      <span className='w-24'>Email:</span> 
                      <span className='sm:text-2xl font-extrabold'>{user.email}</span>
                    </div>
               </div>
               <p className='font-black mt-4 text-2xl lg:text-3xl'>Colors</p>
               <div className='sm:ml-7 mt-2'>
                    <div className='flex items-center'>
                        <span className='sm:w-20'>Theme:</span> 
                        <ColorCard color="black"/>
                        <ColorCard color="white"/>
                    </div>
                    <div className='flex items-center mt-2 flex-wrap'>
                        <span className='sm:w-20'>Accent :</span> 
                        {
                          accentColors.map((color,idx)=>(
                            <ColorCard key={idx} color={color}/>
                          ))
                        }
                    </div>
               </div>
            </div>
            </div> 
            <div className='justify-end items-end'>
              <Footer/>
            </div>
        </div>
  )
}

export default Settings