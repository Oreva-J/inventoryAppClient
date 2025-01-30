import React from 'react'
import { links } from '../../constants'
import SideBarItem from './SideBarItem'


const SideBar = ({isSideBarOpen}) => {
  return (
    <div className={`sm:translate-x-0 w-[40%] md:w-1/5 h-screen border fixed left-0 top-28 z-40 transition-transform duration-500 bg-white dark:bg-gray-800 dark:text-slate-100 ${isSideBarOpen? "translate-x-0 " : "-translate-x-full"} `} >
     
      <div className='h-full px-3 pb4 overflow-y-auto'>
        <ul className='space-y-2'>
          {
              links.map((link, index)=> <SideBarItem key={index} {...link}  /> )
          }
        </ul>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  )
}

export default SideBar
