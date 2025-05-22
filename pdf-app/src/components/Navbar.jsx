'use client';

import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../authContext.js';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
  

        <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
          <DescriptionIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" color="primary">
            PDF Collab
          </Typography>
        </Box>


        {user ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Button
            variant="contained"
           
            onClick={() => {
              router.push('/dashboard');
            }
          }
          
          >
            Dashboard
          </Button>
            
            <Button
              color="primary"
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Logout
            </Button>
            <IconButton color="primary" onClick={() => router.push('/')}>
              <SettingsIcon />
            </IconButton>
          </Box>
        )
        :
        <Box display="flex" alignItems="center" gap={1}>
            
            <Button
            variant="contained"
          
             onClick={() => {
              router.push('/login');
            }
          }
          >
            Log In
          </Button>
          <Button
            variant="outlined"
           
            onClick={() => {
              router.push('/signup');
            }
          }
          
          >
            Sign Up
          </Button>
    
        </Box>
        }
      </Toolbar>
    </AppBar>
  );
}
