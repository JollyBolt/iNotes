import { NavLink, useLocation } from "react-router-dom"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useState } from "react";

const Sidebar = () => {
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
            "item": "Setting",
            "to": "/setting"
        },
    ]
    const [expanded, setExpanded] = useState(true);
    let location = useLocation();
    return (
        <div className={`h-screen  left-0 top-0 fixed z-[50]`}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 ml-1" >
                    <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg bg-gray-50">
                        <MenuOutlinedIcon />
                    </button>
                </div>
                <ul className="flex-1  p-3">
                    {
                        sideBarItems.map(({ index, icon, item, to }) => {
                            return (
                                <NavLink key={index} to={to}>
                                    <li
                                        className={` flex relative font-medium px-3 py-2 items-center my-3 rounded-md cursor-pointer transition-colors h-10
                                 group 
                                ${location.pathname === to
                                                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                                                : "hover:bg-indigo-50 text-gray-600"
                                            }`}>
                                        {icon}
                                        <span className={` overflow-hidden transition-all ${expanded ? " ml-3" : "w-0 "}`}>{item}</span>
                                        {!expanded && (
                                            <div className="absolute left-[70px] w-40 rounded-md text-sm text-indigo-800 bg-indigo-100 px-2 py-1 invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                                                {item}
                                            </div>
                                        )}
                                    </li>
                                </NavLink>
                            )
                        })
                    }
                </ul>
                {/* User Card */}
                <div className="border-t rounded-lg px-3 pt-3 flex items-center  text-red-500">
                    <button className={`ml-1 p-2 border border-red-500 rounded-lg ${!expanded ? "w-10 flex justify-center " : ""} transition-all`}>
                        <PowerSettingsNewOutlinedIcon />
                        {expanded && <span className={`overflow-hidden transition-all ml-1`}>Logout</span>}
                    </button>
                </div>
                <div className="h-16  flex p-3 rounded-lg items-center">
                    <div className="w-10 h-10 bg-purple-300 flex items-center justify-center rounded-md ml-1">
                        <i className="fa-solid fa-j text-3xl"></i>
                    </div>
                    <div className={`overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0 text-[1px]"}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold">John Doe</h4>
                            <span className="text-xs">johndoe@gmail.com</span>
                        </div>
                    </div>
                </div>

            </nav>
        </div >
    )
}

export default Sidebar