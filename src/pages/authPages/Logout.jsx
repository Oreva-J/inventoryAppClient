import { Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MiniSpinner } from '../../components/Spinner'
import { logoutUser } from '../../redux/features/auth/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'

const Logout = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const logout = async (e)=>{
        e.preventDefault()

        setIsLoading(true)

        await logoutUser()
        await dispatch(SET_LOGIN(false))
        await dispatch(SET_NAME(""))
        navigate('/')
        setIsLoading(false)
        

    }
  return (
    <>
        <MiniSpinner isLoading={isLoading} />
        <Button onClick={logout} variant='outlined'>
            Logout
        </Button>
    </>
  )
}

export default Logout
