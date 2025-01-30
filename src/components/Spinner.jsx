import React from 'react'
import loader from "../assets/Infinitysvg.svg"
import miniLoader from "../assets/loader.gif"
import ReactDom from "react-dom"

const Spinner = ({ isLoading }) => {
  if(!isLoading) return null;

  return ReactDom.createPortal(
    <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center'>
        <img 
          src={loader} 
          alt="Loading..." 
          className="max-w-full max-h-full"
        />
    </div>,
    document.getElementById("loader")
  )
}

export const MiniSpinner = ({isLoading})=>{
    if(!isLoading) return null; 
    return(
        <div className="flex justify-center items-center absolute top-0 bottom-0 right-0 left-0">
            <img src={miniLoader} alt="Loading..." />
        </div>
    )
}

export default Spinner
