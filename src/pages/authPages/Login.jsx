import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardHeader, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Password from '../../components/inputs/Password';
import { Link } from 'react-router-dom';

const Login = () => {

        const [showPassword, setShowPassword] = React.useState(false);
      
        const handleClickShowPassword = () => setShowPassword((show) => !show);
      
        const handleMouseDownPassword = (event) => {
          event.preventDefault();
        };
      
        const handleMouseUpPassword = (event) => {
          event.preventDefault();
        };
    

  return (
    <Paper sx={{ padding:8 }} elevation={4}>
        
            <div className='flex flex-col justify-center items-center '>

            <Card  sx={{ maxWidth:"400px" }} >
                <CardHeader 
                    title="Login"
                />
                <CardContent>
                    <form >
                        
                        <FormControl sx={{ justifyContent:"center", width:300 }}>
                            <TextField type="email" label="Email" variant="outlined" />
                            <Password text="Password" />

                        </FormControl>

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