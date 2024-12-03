import React from 'react'
import { useRouteError } from 'react-router-dom'


const ErrorPage = () => {
    const error = useRouteError()
    console.log(error);
    
  return (
    <div id='error-page'>
        <h1 className='text-3xl text-red-500'>Oooops!</h1>
        <p>Sorry an unexpected error has occured. Oreva</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>

      
    </div>
  )
}

export default ErrorPage
