"use client"
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import PDFViewer from "../../../components/PDFViewer";
import PDFComments from "../../../components/PDFComments";


export default function SharedPDF(){
    const {sharedToken} = useParams();
    const [pdf, setPdf] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/api/pdf/shared/${sharedToken}`)
            if (!res.ok) {
                console.error("Failed to fetch PDF URL");
                return;
            }
            const pdf = await res.json();
            console.log("pdf is", pdf);
            setPdf(pdf);
        };

        fetchData();
    }, [sharedToken]);

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
      height: 'calc(100vh - 100px)', 
    }}
  >
    {/* PDF Viewer - 70% */}
    <Box sx={{ flex: 7, overflow: 'auto' }}>
      <PDFViewer fileName={pdf.fileName} gcsFileName={pdf.gcsFileName} shared={sharedToken} />
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
      <PDFComments pdfId={pdf.pdfId} shared={sharedToken}/>
    </Box>
  </Box>
</Container>
  );





}