'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import axios from 'axios';

export default function SharePDFdialog({ open, onClose, shareUrl, pdfId }) {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      alert('Failed to copy');
    }
  };

  const handleSend = async () => {
    if (!email) return;
    setStatus('sending');
    try {
      await axios.post(`http://localhost:5000/api/share/email`, {
        email,
        link: shareUrl,
        pdfId,
      });
      setStatus('success');
      setMessage('Email sent successfully!');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Failed to send email');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Share PDF</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Share this PDF with others using the link below:
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              value={shareUrl}
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCopy}>
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Or send it to someone by email:
          </Typography>

          <TextField
            label="Recipient Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button variant="contained" onClick={handleSend} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Email'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>Link copied!</Alert>
      </Snackbar>

      <Snackbar
        open={message !== ''}
        autoHideDuration={3000}
        onClose={() => setMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={status === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
