import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <div className='w-[80%] mx-auto bg-white dark:bg-black  border-t-2 dark:border-seperator  mb-3 mt-5  md:px-16 py-5 sm:p-5 flex flex-col sm:flex-row items-center-center sm:justify-between'>
            <div className='flex justify-center'>
                <span className='whitespace-break-spaces'>Made by </span>
                <span className='font-black'>Ishan Sen.</span>
            </div>
            <div className='flex justify-center'>
                <a href="https://github.com/JollyBolt" target='_blank'><span className='mx-2'><GitHubIcon/></span></a>
                <a href="https://www.linkedin.com/in/theishansen/" target='_blank'><span className='mx-2'><LinkedInIcon/></span></a>
                <a href="https://www.instagram.com/ishan._.sen/" target='_blank'><span className='mx-2'><InstagramIcon/></span></a>
            </div>
        </div>
    )
}

export default Footer