import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { RiMenuFold2Fill, RiMenuLine } from 'react-icons/ri'
import Logout from '../authPages/Logout'

const DashNavBar = ({darkMode, toggleDarkMode,toggleSideBar, isSideBarOpen}) => {
  return (
    <div>
        <div className="h-28 bg-slate-50 flex justify-around items-center dark:bg-black dark:text-slate-100">
            <button onClick={toggleSideBar} className='text-3xl dark:text-slate-100 transition-all'>
                {isSideBarOpen? <RiMenuFold2Fill />: <RiMenuLine />}
            </button>

            <button onClick={toggleDarkMode} className=''>
                {darkMode? <FaSun /> : <FaMoon />}
            </button>
            <Logout />
        </div>
     
    </div>
  )
}

export default DashNavBar
