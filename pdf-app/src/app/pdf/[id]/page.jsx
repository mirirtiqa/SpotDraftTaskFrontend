'use client';

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
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <PDFViewer fileName={pdf.fileName} filePath={pdf.filePath} />
        </Grid>
        <Grid item xs={12} md={5}>
          <PDFComments pdfId={pdf._id} initialComments={comments} user={user} />
        </Grid>
      </Grid>
    </Container>
  );
}
