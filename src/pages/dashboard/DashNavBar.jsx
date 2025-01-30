import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { RiMenuFold2Fill, RiMenuLine } from 'react-icons/ri'
import Logout from '../authPages/Logout'
import { useSelector } from 'react-redux'
import { selectName } from '../../redux/features/auth/authSlice'

const DashNavBar = ({darkMode, toggleDarkMode,toggleSideBar, isSideBarOpen}) => {
  const name = useSelector(selectName)
  return (
    <div>
        <div className="w-screen fixed h-28 z-50 bg-slate-50 flex justify-around items-center dark:bg-black dark:text-slate-100">
            <button onClick={toggleSideBar} className='text-3xl dark:text-slate-100 transition-all'>
                {isSideBarOpen? <RiMenuFold2Fill />: <RiMenuLine />}
            </button>
            <div className='text-3xl dark:text-gray-300'>Welcome <span className='text-red-400'>{name}</span></div>            

            <div className='flex gap-5'>
              <Logout />
              <button onClick={toggleDarkMode} className='text-2xl'>
                  {darkMode? <FaSun className='dark:text-yellow-400' /> : <FaMoon />}
              </button>
            </div>
        </div>
     
    </div>
  )
}

export default DashNavBar
