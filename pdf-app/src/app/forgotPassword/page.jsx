'use client';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { forgotPasswordReq } from '../../../utils/apis';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = forgotPasswordReq(email);
      if(!res === 200) {
        throw new Error('Failed to send reset link');
      }
        setMsg('Reset link sent to your email');
    } catch (err) {
      setMsg(err.response?.data?.message || err.message || 'Failed to send reset link');
        console.error('Error sending reset link:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Forgot Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Send Reset Link</Button>
      </form>
      {msg && 
      <Typography variant="body1" sx={{ mt: 2 }}>
        {msg}
        </Typography>}

           
    </Container>
  );
}
