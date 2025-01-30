import React from 'react'
import { selectName } from '../../redux/features/auth/authSlice'
import { useSelector } from 'react-redux'


const Main = ({children}) => {
  const name = useSelector(selectName)

  return (
    <div className='pl-[25%] dark:bg-black dark:text-gray-300 min-h-screen relative pt-28' >
      <hr />
        {children}
    </div>
  )
}

export default Main
