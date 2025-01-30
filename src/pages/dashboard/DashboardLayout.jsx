import React, { useEffect, useState } from 'react'
import SideBar from './sideBar/SideBar'
import Dashboard from './Dashboard'
import { Outlet, useNavigate } from 'react-router-dom'
import DashNavBar from './DashNavBar'
import DashFooter from './DashFooter'
import Main from './Main'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLogin } from '../../redux/features/auth/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import { MiniSpinner } from '../../components/Spinner'
import { selectIsLoading } from '../../redux/features/product/productSlice'

const DashboardLayout = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const isLoading = useSelector(selectIsLoading)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toggleDarkMode = ()=>{
        setDarkMode(!darkMode)
    }

    const toggleSideBar = ()=>{
        setIsSideBarOpen(!isSideBarOpen);
    }

    useEffect(() => {
      const loginStatus = async () => {
        try {
          const data = await isUserLogin(); // Fetch the login status
          data ?  dispatch(SET_LOGIN(data)) : ( dispatch(SET_NAME("")), navigate('/') )  // Dispatch the login status to the store
        } catch (error) {
          console.error("Error checking login status. Please Login or register:", error); // Handle any errors
        }
      };
  
      loginStatus(); // Call the function to check login status
    }, [dispatch]); // Re-run the effect if `dispatch` changes (though `dispatch` should remain constant)
  


  return (
    <div className={`${darkMode && "dark"} font-poppins relative`}>
       <DashNavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen} />
        <SideBar isSideBarOpen={isSideBarOpen} />
        <Main >
            {isLoading && <MiniSpinner isLoading={isLoading} /> }
            <Outlet />
           
        </Main>
        
      
    </div>
  )
}

export default DashboardLayout
