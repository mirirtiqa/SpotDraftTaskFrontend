'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { signupReq,loginReq, fetchPDFsReq } from './utils/apis';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const [pdfs, setPdfs] = useState([]);

  const fetchPDFs = async () => {
    try {
      const pdfArray = await fetchPDFsReq();
      setPdfs(pdfArray);
    } catch (err) {
      console.error('Failed to fetch PDFs:', err);
    }
  };

  const login = async ({ email, password }) => {
    try{
    const res = await loginReq({ email, password });
    const { user, token } = res.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setUser(user);
    }
    catch(error){
      console.error("Error during login:", error);
    }
  };

  const signup = async ({ name, email, password }) => {
    try{
      await signupReq({ name, email, password });
    }
    catch(error){
      console.error("Error during signup:", error);
    }
    
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout , pdfs, setPdfs, fetchPDFs}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);