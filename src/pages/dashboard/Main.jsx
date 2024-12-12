import React from 'react'
import { selectName } from '../../redux/features/auth/authSlice'
import { useSelector } from 'react-redux'


const Main = ({children}) => {
  const name = useSelector(selectName)

  return (
    <div className='pl-[25%] dark:bg-black dark:text-gray-300 min-h-screen' >
      <div className='text-3xl mb-10 dark:text-gray-300'>Welcome <span className='text-red-400'>{name}</span></div> <hr />
        {children}
    </div>
  )
}

export default Main
