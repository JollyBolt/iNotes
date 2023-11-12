import React, { useContext } from 'react'
import colorContext from '../context/ColorContext'

const ColorCard = ({color}) => {
    const {accent,setAccent,theme,handleDarkMode} = useContext(colorContext)
    const handleClick = () =>{
        if(color==="black"||color==="white"){
            if(theme==='dark'&&color==='white' || theme==='light'&&color==='black')
            handleDarkMode()
        }
        else {
            setAccent(color)
        }
    }

  return (
    <div className={`h-8 w-8 rounded-full ${accent===color || theme==='light'&&color==='white' || theme==='dark'&&color==='black'?'bg-orange-500':''}  flex items-center justify-center mx-2`}>
        <div className='rounded-full h-6 w-6 bg-black dark:bg-white flex items-center justify-center'>
            <div 
            className={`${color==="black"||color==="white"?`bg-${color}`:`bg-${color}-500`}  h-5 w-5 rounded-full  cursor-pointer`}
            onClick={handleClick}
            />
        </div>
    </div>

  )
}

export default ColorCard