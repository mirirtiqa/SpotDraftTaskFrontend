'use client';
import { Box} from '@mui/material';
import { Container, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PDFViewer from '../../../components/PDFViewer';
import PDFComments from '../../../components/PDFComments';
import { useAuth } from '../../../../authContext.js';
import ShareButton from '@/components/ShareButton';
import { fetchPDF } from '../../../../utils/apis';

export default function PDFPage() {
  const { id } = useParams();
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const pdf = await fetchPDF(id);
      console.log("pdf is", pdf);
      setPdf(pdf);
    };

    fetchData();
  }, []);

  if (!pdf) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
     <ShareButton pdfId={id}/>
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 2,
      height: 'calc(100vh - 100px)', 
      mt: 2,
    }}
  >
   
    <Box sx={{ flex: 7, overflow: 'auto' }}>
      <PDFViewer fileName={pdf.fileName} gcsFileName={pdf.gcsFileName} shared={false} />
    </Box>

   
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
      <PDFComments pdfId={pdf.pdfId} shared={false}/>
    </Box>
  </Box>
</Container>
  );
}
