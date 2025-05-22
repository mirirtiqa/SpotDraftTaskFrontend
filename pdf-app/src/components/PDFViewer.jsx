'use client';

import { Typography, Box } from '@mui/material';

export default function PDFViewer({ fileName, filePath }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {fileName}
      </Typography>
      <Box
        component="iframe"
        src={filePath}
        width="100%"
        height="600px"
        sx={{ border: '1px solid #ccc' }}
      />
    </Box>
  );
}
