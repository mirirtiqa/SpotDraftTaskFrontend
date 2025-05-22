'use client';
import { Box} from '@mui/material';
import { Container, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PDFViewer from '../../../components/PDFViewer';
import PDFComments from '../../../components/PDFComments';
import { useAuth } from '../../../../authContext.js';

export default function PDFPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [pdf, setPdf] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log("in fetchdata of dynamic route of pdf")

      const res1 = await fetch(`http://localhost:5000/api/pdf/getpdf/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const pdf = await res1.json();
      console.log("pdf is", pdf);

      const res2 = await fetch(`http://localhost:5000/api/comments/get/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }

      );
      const data2 = await res2.json();

      setPdf(pdf);
      setComments(data2.comments);
    };

    fetchData();
  }, [id]);

  if (!pdf) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      height: 'calc(100vh - 100px)', // adjust as needed
    }}
  >
    {/* PDF Viewer - 70% */}
    <Box sx={{ flex: 7, overflow: 'auto' }}>
      <PDFViewer fileName={pdf.fileName} gcsFileName={pdf.gcsFileName} />
    </Box>

    {/* Comments - 30% */}
    <Box
      sx={{
        flex: 3,
        bgcolor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 1,
        padding: 2,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <PDFComments pdfId={pdf._id} initialComments={comments} user={user} />
    </Box>
  </Box>
</Container>
  );
}
