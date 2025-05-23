'use client';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Input,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import { useAuth } from '../../authContext.js';
import { uploadPDFReq } from '../../utils/apis.js';

export default function UploadPDFButton() {
  const { user,pdfs, setPdfs } = useAuth();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected?.type !== 'application/pdf') {
      setMessage('Only PDF files are allowed.');
      setStatus('error');
      return;
    }
    setFile(selected);
    setMessage('');
    setStatus('idle');
  };

  const handleUploadButtonClick = () => {
      if(!user){
        alert("Please login to upload a PDF");
        return;
      }
      setOpen(true)
  }


  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      setStatus('uploading');

      const newPdf = await uploadPDFReq(formData);
      setPdfs([newPdf, ...pdfs]);

      setStatus('success');
      setMessage('PDF uploaded successfully!');
      setFile(null);
      setTimeout(() => {
        setOpen(false);
        setMessage('');
        setStatus('idle');
      }, 1000);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Upload failed.');
    }
  };

  return (
    <>
     
      <Tooltip title="Upload a PDF">
        <Button
          variant="contained"
          startIcon={<UploadFileIcon />}
          onClick={handleUploadButtonClick}
        >
          Upload PDF
        </Button>
      </Tooltip>

      
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Upload PDF</DialogTitle>

        <DialogContent>
          <Typography variant="body2" mb={2}>
            Select a PDF file to upload.
          </Typography>

          <Input
            type="file"
            inputProps={{ accept: 'application/pdf' }}
            onChange={handleFileChange}
            disableUnderline
            fullWidth
          />

          {message && (
            <Alert
              severity={status === 'error' ? 'error' : 'success'}
              sx={{ mt: 2 }}
            >
              {message}
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={!file || status === 'uploading'}
          >
            {status === 'uploading' ? <CircularProgress size={20} /> : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
