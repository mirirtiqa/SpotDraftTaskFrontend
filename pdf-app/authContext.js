'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const login = async ({ email, password }) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });

    const { user, token } = res.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setUser(user);
  };

  const signup = async ({ name, email, password }) => {
    await axios.post('http://localhost:5000/api/auth/signup', {
      name,
      email,
      password,
    });
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
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


