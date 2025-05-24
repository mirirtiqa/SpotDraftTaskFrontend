"use client";
import "./globals.css";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../../theme';
import { AuthProvider } from '../../authContext.js';
import Navbar from '@/components/Navbar';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar /> 
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
