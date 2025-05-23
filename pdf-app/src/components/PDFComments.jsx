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
import { useAuth } from '../../authContext.js';
import { useEffect } from 'react';
import { getComments , getSharedPDFComments, addComment, addCommentOnShared} from '../../utils/apis.js';

export default function PDFComments({ pdfId, shared }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ content: '',authorName: '' });
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  
    useEffect(() => {
      const fetchData = async () => {
        console.log(pdfId)
        if (shared){
          const data = await getSharedPDFComments(pdfId,shared);
          console.log("comments are", data);
          setComments(data);
        }
        else{
          const data = await getComments(pdfId);
          console.log("comments are", data);
          setComments(data);
        }
        
      };
  
      fetchData();
    }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) return;
    if(shared){
      const data = await addCommentOnShared(pdfId, form.content, form.authorName, shared);
      setComments([...comments, data]);
      console.log("data is", data);
    }
    else{
      const data = await addComment(pdfId, form.content, user.name);
      setComments([...comments, data]);

    }
    
    setForm({ content: '', authorName: '' });
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={form.content}
            onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Write a comment..."
          />
          {shared && <TextField
            fullWidth
            rows={4}
            value={form.authorName}
            onChange={(e) => setForm(prev => ({ ...prev, authorName: e.target.value }))}
            placeholder="Your name"
          /> }
          
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Add
          </Button>
        </form>
      </Paper>

      {/* <Typography variant="h6" gutterBottom>
        Comments
      </Typography> */}

      {comments && comments.length > 0 ? (
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
