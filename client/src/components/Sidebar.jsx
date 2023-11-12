import { NavLink, useLocation } from "react-router-dom"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useContext } from "react";
import userContext from "../context/userContext";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import colorContext from "../context/ColorContext";


const Sidebar = ({expanded}) => {
    const {user} = useContext(userContext)
    const {theme,accent,handleDarkMode} = useContext(colorContext)

    const sideBarItems = [
        {
            "index": 1,
            "icon": <HomeOutlinedIcon />,
            "item": "Home",
            "to": "/"
        },
        {
            "index": 2,
            "icon": <ContentPasteOutlinedIcon />,
            "item": "Personal Notes",
            "to": "/personal"
        },
        {
            "index": 3,
            "icon": <WorkOutlineOutlinedIcon />,
            "item": "Work Notes",
            "to": "/work"
        },
        {
            "index": 4,
            "icon": <SettingsOutlinedIcon />,
            "item": "Settings",
            "to": "/settings"
        },
    ]


    let location = useLocation();
    return (
        <div>
        <div className={`h-[calc(100vh-4rem)] fixed lg:sticky left-0 top-[4rem] z-[40]`}>
            <nav className={`h-full flex flex-col bg-white dark:bg-black border-r shadow-sm dark:border-seperator  `}>
                <ul className="flex-1  p-3">
                    {
                        sideBarItems.map(({ index, icon, item, to }) => {
                            return (
                                <NavLink key={index} to={to}>
                                    <li
                                        className={` flex relative font-medium px-3 py-2 items-center my-3 rounded-md cursor-pointer transition-colors h-10 group 
                                        ${location.pathname === to
                                        ?`bg-gradient-to-r from-${accent}-400 to-${accent}-900 dark:from-${accent}-600 dark:to-${accent}-900 ${accent==='yellow'?'dark:text-black':'dark:text-white'} ${accent==='purple'?'text-white':''} ` 
                                        :`hover:bg-${accent}-500 text-gray-800 dark:hover:bg-${accent}-800 dark:text-white ${accent==='yellow'||accent==='gray'?'hover:dark:text-black':'dark:text-white'}`
                                        }`}>
                                        {icon}
                                        <span className={` overflow-hidden transition-all $ ${expanded ? " ml-3" : "text-[0px] "}`}>{item}</span>
                                        {!expanded && (
                                            <div className="absolute left-[70px]  rounded-md text-sm text-indigo-700 bg-indigo-100 dark:bg-seperator dark:text-gray-400 px-2 py-1 invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                                                <span className="whitespace-nowrap">{item}</span>
                                            </div>
                                        )}
                                    </li>
                                </NavLink>
                            )
                        })
                    }
                </ul>

                <div className={`px-3  border-t-2 dark:border-seperator`}>
                <div className= {`flex relative font-medium px-3 items-center my-3 rounded-md cursor-pointer transition-colors h-10 group hover:bg-${accent}-200 dark:hover:bg-${accent}-800 ${accent==='yellow'||accent==='gray'?'hover:dark:text-black':'dark:text-white'}`} onClick={handleDarkMode}>
                    <button  className="flex  justify-center ">
                        {theme==='light'
                            ?<LightModeOutlinedIcon />
                            :<DarkModeOutlinedIcon />
                        }
                    </button>
                    <span  className={` overflow-hidden  ${expanded ? " ml-3" : "text-[0px] "}`}>Toggle Theme</span>
                        {!expanded && (
                            <div className="absolute left-[70px] rounded-md text-sm text-indigo-700 bg-indigo-100 dark:bg-seperator dark:text-gray-400 px-2 py-1 invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group:hover:translate-x-0">
                                <span className="whitespace-nowrap">Toggle Theme</span>
                            </div>
                        )}
                </div>
                </div>
                <div className="h-16  flex p-3 rounded-lg items-center">
                    <div className="w-10 h-10  flex items-center justify-center rounded-md ml-1">
                        <img 
                        className="rounded-md border-2 border-black dark:border-white"
                        src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=BA68C8&bold=true`} alt="" />
                    </div>
                    <div className={`overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "  w-0 text-[0px]"}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold dark:text-white">{user?.firstName} {user?.lastName}</h4>
                            <p className="text-xs dark:text-white">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </nav>

            
        </div >
        </div>
    )
}

export default Sidebar