'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { resetPasswordReq } from '../../../../utils/apis';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPasswordReq(token, password);
      if(res !== 200) {
        throw new Error('Failed to reset password');
      }
      setMsg("Password reset successfully. Redirecting to login...");
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || err.message || 'Failed to reset password');
      console.error('Error resetting password:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Reset Your Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Reset Password</Button>
      </form>
      {msg && <Alert sx={{ mt: 2 }}>{msg}</Alert>}
    </Container>
  );
}
