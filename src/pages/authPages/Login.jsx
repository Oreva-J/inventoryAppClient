
import { Button, Card, CardActions, CardContent, CardHeader, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Password from '../../components/inputs/Password';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/features/auth/authService';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Spinner from '../../components/Spinner';


const Login = () => {
  const [userData, setUserData] = useState({email:"", password:""})
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFormChange = (event)=>{
    const {name, value} = event.target
    setUserData({ ...userData, [name]:value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setIsLoading(true)
    const data = await loginUser(userData)
    //await dispatch(SET_LOGIN(true))
    await dispatch(SET_NAME(data.name))
    setIsLoading(false)
    navigate('/dashboard')
    
  }
    

  return (
    <Paper sx={{ padding:8, height:'100%' }} elevation={4}>
        <Spinner isLoading={isLoading} />
            <div className='flex flex-col justify-center items-center '>

            <Card  sx={{ maxWidth:"400px" }} >
                <CardHeader 
                    title="Login"
                />
                <CardContent>
                    <form onSubmit={handleSubmit} >
                        
                        <FormControl sx={{ justifyContent:"center", width:300 }}>

                            <TextField required  type="email" label="Email" variant="outlined"
                            name='email' value={userData.email} onChange={handleFormChange} />
                            <Password required text="Password" 
                            name='password' value={userData.password} onChange={handleFormChange} />

                        </FormControl>
                        <Button type='submit' variant="outlined">Submit</Button>

                    </form>
                </CardContent>
                    <CardActions>
                    <Link to="/">
                            <Button size="small">Home</Button>
                        </Link>
                        <p>Don't have an account?</p>
                        <Link to="/register">
                            <Button size="small">Register</Button>
                        </Link>
                    </CardActions>
            </Card>
            </div>
       
      
    </Paper>
  )
}

export default Login


export const Sskeleton = ()=>{
    return(
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
    )
}