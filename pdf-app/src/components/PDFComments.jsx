'use client';

import {
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Box,
} from '@mui/material';
import { useState } from 'react';

export default function PDFComments({ pdfId, initialComments = [], user }) {
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) return;

    const res = await fetch(`http://localhost:5000/api/comments/public/${pdfId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: form.content,
        authorName: user?.name || 'Anonymous',
      }),
    });

    const data = await res.json();
    setComments([...comments, data.comment]);
    setForm({ content: '' });
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Comment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ content: e.target.value })}
            placeholder="Write a comment..."
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <Paper key={comment._id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2">{comment.authorName}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>{comment.content}</Typography>
          </Paper>
        ))
      ) : (
        <Typography>No comments yet.</Typography>
      )}
    </Box>
  );
}
