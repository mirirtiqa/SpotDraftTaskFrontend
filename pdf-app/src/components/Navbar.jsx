'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useAuth } from '../../authContext.js';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = user ? (
    <>
      <ListItem button onClick={() => router.push('/dashboard')}>
        <ListItemText primary="Dashboard" sx={{color:'primary.main'}}/>
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemText primary="Logout" sx={{color:'primary.main'}} />
      </ListItem>
      <ListItem button onClick={() => router.push('/')}>
        <ListItemText primary="Settings" sx={{color:'primary.main'}}/>
      </ListItem>
    </>
  ) : (
    <>
      <ListItem button onClick={() => router.push('/login')}>
        <ListItemText primary="Login" sx={{color:'primary.main'}} />
      </ListItem>
      <ListItem button onClick={() => router.push('/signup')}>
        <ListItemText primary="Sign Up" sx={{color:'primary.main'}} />
      </ListItem>
    </>
  );

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            <DescriptionIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" color="primary">
              PDF Collab
            </Typography>
          </Box>

         
          {!isMobile ? (
            user ? (
              <Box display="flex" alignItems="center" gap={1}>
                <Button variant="contained" onClick={() => router.push('/dashboard')}>
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
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {user.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
                </IconButton>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <Button variant="contained" onClick={() => router.push('/login')}>
                  Log In
                </Button>
                <Button variant="outlined" onClick={() => router.push('/signup')}>
                  Sign Up
                </Button>
              </Box>
            )
          ) : (
            
            <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>{drawerItems}</List>
        </Box>
      </Drawer>
    </>
  );
}

