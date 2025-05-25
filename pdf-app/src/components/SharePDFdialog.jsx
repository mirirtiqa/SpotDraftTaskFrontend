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
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import axios from 'axios';
import { sharePDFLinkInEmail } from '../../utils/apis';
import { useAuth } from '../../authContext.js';

export default function SharePDFdialog({ open, onClose, shareUrl }) {
  const { user } = useAuth();

  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      alert('Failed to copy');
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      setMessage('Please enter an email address');
      setStatus('error');
      return;
    }

    try {
      const res = await sharePDFLinkInEmail(email, shareUrl,user.name);
      setStatus('success');
      setMessage(res);
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage(err.message || 'Failed to send email');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Share PDF</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Link
          </Typography>

          <Box display="flex" alignItems="center" mb={3}>
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
            Send link via email
          </Typography>

          <Box display="flex" gap={1} alignItems="center">
            <TextField
              fullWidth
              label="Recipient email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IconButton
              color="primary"
              onClick={handleSendEmail}
              sx={{ mt: 1 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
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
