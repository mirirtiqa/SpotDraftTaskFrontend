"use client";
import { Box, Button, Typography, Container, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function landingPage() {
  const router = useRouter();
  return (

    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(to bottom right, #e3f2fd, #ffffff)',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          PDF Management & Collaboration
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Upload, share, and comment on your PDF documents seamlessly.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
         
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              router.push('/signup');
            }
          }
          
          >
            Sign Up
          </Button>
        </Stack>
      </Container>
    </Box>
    
  );
}



