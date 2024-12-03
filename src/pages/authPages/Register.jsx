import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardHeader, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Password from '../../components/inputs/Password';
import { Link } from 'react-router-dom';
import { registerUser } from '../../redux/features/auth/authService';
import { toast } from "react-toastify"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

        const [userData, setUserData] = useState({ name:"", email: "", password:"", confirmPassword:"" })

        const handleFormChange = (event)=>{
            const { name, value} = event.target

            setUserData({ ...userData, [name]: value })
            
        }

        const handleSubmit = (e)=>{
            e.preventDefault()
            console.log("in handle submit", userData);
            
            registerUser(userData)
            toast.success("hurray")
        } 
    

  return (
    <Paper sx={{ padding:8 }} elevation={4}>
        <ToastContainer />
            <div className='flex flex-col justify-center items-center '>

            <Card  sx={{ maxWidth:"400px" }} >
                <CardHeader 
                    title="Register"
                />
                <CardContent>
                    <form onSubmit={handleSubmit} >
                        
                        <FormControl sx={{ justifyContent:"center", width:300 }}>

                            <TextField  label="Name" variant="outlined" name='name' value={userData.name} onChange={handleFormChange} />
                            
                            <TextField type="email" label="Email" variant="outlined" name='email' value={userData.email} onChange={handleFormChange} />
                        
                            <Password text="Password" name='password' value={userData.password} onChange={handleFormChange} />
                            <Password text="Confirm Password" name='confirmPassword' value={userData.confirmPassword} onChange={handleFormChange}  />

                        </FormControl>
                        <Button type='submit' variant="outlined">Submit</Button>

                    </form>
                </CardContent>
                    <CardActions>
                        <Link to="/">
                            <Button size="small">Home</Button>
                        </Link>
                        <p>Already have an account</p>
                        <Link to="/login">
                            <Button size="small">Login</Button>
                        </Link>
                    </CardActions>
            </Card>
            </div>
       
      
    </Paper>
  )
}

export default Register


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