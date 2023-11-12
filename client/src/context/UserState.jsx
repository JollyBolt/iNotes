import React, { useState,useEffect } from 'react'
import userContext from './userContext'


const UserState = (props) => {
    const [user,setUser] = useState(null)
    
    const handleUser = async() =>{
        setUser(JSON.parse(localStorage.getItem('user')))  
    }
        
    useEffect(() => {
        if(localStorage.getItem('user')){
        handleUser();
    }
      }, [])

    return (
        <userContext.Provider value={{user,setUser,handleUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState