import React, { useState } from 'react'
import SideBar from './sideBar/SideBar'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'
import DashNavBar from './DashNavBar'
import DashFooter from './DashFooter'
import Main from './Main'

const DashboardLayout = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const toggleDarkMode = ()=>{
        setDarkMode(!darkMode)
    }

    const toggleSideBar = ()=>{
        setIsSideBarOpen(!isSideBarOpen);
    }
  return (
    <div className={`${darkMode && "dark"} font-poppins`}>
       <DashNavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen} />
        <SideBar isSideBarOpen={isSideBarOpen} />
        <Main >
            <Outlet />
        </Main>
        
      
    </div>
  )
}

export default DashboardLayout
