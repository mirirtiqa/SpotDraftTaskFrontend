'use client';

import { Typography, Box } from '@mui/material';
import { use } from 'react';
import { useState,  useEffect } from 'react';
export default function PDFViewer({ fileName, gcsFileName}) {
  const [filePath, setFilePath] = useState('');
  useEffect(() => {
  const fetchFilePath = async () => {
    try {
      console.log(gcsFileName);
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/pdf/getpdfurl/${gcsFileName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch PDF URL");

      const data = await res.json();
      setFilePath(data.url);
      console.log("file path is", data.url);
    } catch (error) {
      console.error("Error fetching PDF URL:", error);
    }
  };

  fetchFilePath();
}, [gcsFileName]);
  //make an API call to get the file path 
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {fileName}
      </Typography>
       {filePath ? (
      <Box
        component="iframe"
        src={filePath}
        width="100%"
        height="600px"
        sx={{ border: '1px solid #ccc' }}
      />
    ) : (
      <Typography variant="body2">Loading PDF...</Typography>
    )}
    </Box>
  );
}
