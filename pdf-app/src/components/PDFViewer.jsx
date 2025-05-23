'use client';

import { Typography, Box } from '@mui/material';
import { use } from 'react';
import { useState,  useEffect } from 'react';
import {getPDFUrl, getSharedPDFUrl } from '../../utils/apis.js';

export default function PDFViewer({ fileName, gcsFileName,shared}) {
  const [filePath, setFilePath] = useState('');
  useEffect(() => {
  const fetchFilePath = async () => {
    try {
      console.log(shared)
      if (shared){
        console.log("in shared")
        const url = await getSharedPDFUrl(gcsFileName,shared);
        setFilePath(url);
      }
      else{
        console.log("in not shared")
        const url = await getPDFUrl(gcsFileName);
        console.log("url is", url);
        setFilePath(url);
      }
      
    } catch (error) {
      console.error("Error fetching PDF URL:", error);
    }
  };

  fetchFilePath();
}, []);
  
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
