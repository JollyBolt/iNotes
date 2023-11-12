import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';


const RootLayout = () => {
    const [expanded, setExpanded] = useState(window.innerWidth>800?true:false);
    return (
        <div>
            <Navbar setExpanded={setExpanded}/>
            <div className='flex relative '>
                    <Sidebar expanded={expanded}/>
                    {/* <div className='flex flex-col relative'> */}
                        <Outlet context={expanded}/>
                        {/* <Footer/> */}
                    {/* </div> */}
            </div>
        </div>
    )
}

export default RootLayout
