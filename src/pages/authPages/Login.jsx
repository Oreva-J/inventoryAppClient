import { Button, Card, CardActions, CardContent, CardHeader, FormControl, TextField, Typography, Paper, Stack, Box, CardMedia } from '@mui/material';
import React, { useState } from 'react';
import Password from '../../components/inputs/Password';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/features/auth/authService';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Spinner from '../../components/Spinner';
import logo from '../../assets/StockPilot_noBg.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginUser({ email, password });
      dispatch(SET_NAME(data.name));
      dispatch(SET_LOGIN(true));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 8, height: '100%' }} elevation={4}>
      <Spinner isLoading={isLoading} />
      <Box className="flex flex-col justify-center items-center">
        <Card sx={{ maxWidth: '400px' }}>
            <CardMedia
                        sx={{ height: 50 }}
                      image={logo}
                      title="Login"
                  />
          <CardHeader title="Login" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  required
                  type="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  onChange={handleFormChange}
                />
                <Password
                  required
                  text="Password"
                  name="password"
                  value={password}
                  onChange={handleFormChange}
                />
                <div className="flex justify-between">
                  <Button type="submit" variant="outlined" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Submit'}
                  </Button>
                  <Link to="/forgotpassword">Forgot Password?</Link>
                </div>
              </Stack>
            </form>
          </CardContent>
          <CardActions>
            <Link to="/">
              <Button size="small">Home</Button>
            </Link>
            <Typography variant="body2">Don't have an account?</Typography>
            <Link to="/register">
              <Button size="small">Register</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </Paper>
  );
};

export default Login;