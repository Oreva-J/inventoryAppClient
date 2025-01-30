import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { forgotPassword } from '../../redux/features/auth/authService';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    // Simulate API call for forgot password

    forgotPassword(email)
    
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Box className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Typography variant="h4" align="center" className="mb-6">
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          {error && <Alert severity="error" className="mb-4">{error}</Alert>}
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<SendIcon />}
          >
            Send Reset Link
          </Button>
        </form>
        <Link className='font-semibold text-blue-900 border inline-block mt-3 ' to="/">Home</Link>
      </Box>
    </Container>
  );
};

export default ForgotPasswordForm;