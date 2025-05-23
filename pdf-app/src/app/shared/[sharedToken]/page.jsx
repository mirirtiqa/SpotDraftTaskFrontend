"use client"
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import PDFViewer from "../../../components/PDFViewer";
import PDFComments from "../../../components/PDFComments";
import { fetchSharedPDF } from "../../../../utils/apis";


export default function SharedPDF(){
    const {sharedToken} = useParams();
    const [pdf, setPdf] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try{
            const pdf = await fetchSharedPDF(sharedToken);
            console.log("pdf is", pdf);
            setPdf(pdf);
          }
          catch(error){
            console.error("Error during fetching shared PDF:", error);
          }
          
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
    
    <Box sx={{ flex: 7, overflow: 'auto' }}>
      <PDFViewer fileName={pdf.fileName} gcsFileName={pdf.gcsFileName} shared={sharedToken} />
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
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <PDFComments pdfId={pdf.pdfId} shared={sharedToken}/>
    </Box>
  </Box>
</Container>
  );





}