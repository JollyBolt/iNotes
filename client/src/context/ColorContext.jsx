import { createContext, useEffect, useState } from "react";

const colorContext = createContext();

export default colorContext;

export const ColorState = (props) =>{

    useEffect(()=>{
        handleDarkMode()
        handleDarkMode()
    },[])

    const accentColors = [
        "red",
        "yellow",
        "blue",
        "green",
        "purple",
        "gray"
    ]

    const [theme,setTheme] = useState(localStorage.getItem('color-theme'))
    const [accent,setAccent] = useState(theme==='light'?'blue':'gray')


    const handleDarkMode = () =>{
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
                document.body.classList.remove('bg-white')
                document.body.classList.add('bg-black')
                setTheme('dark')
                setAccent('gray')
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
                document.body.classList.remove('bg-black')
                document.body.classList.add('bg-white')
                setTheme('light')
                setAccent('blue')
            }

        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
                document.body.classList.remove('bg-black')
                document.body.classList.add('bg-white')
                setTheme('light') 
                setAccent('blue')
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
                document.body.classList.remove('bg-white')
                document.body.classList.add('bg-black')
                setTheme('dark')
                setAccent('gray')
            }
        }
    }
    

    return(
        <colorContext.Provider value={{theme,setTheme,accent,setAccent,handleDarkMode,accentColors}}>
            {props.children}
        </colorContext.Provider>
    )
}