'use client';

import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../authContext.js';
import { useRouter } from 'next/navigation';
import PDFoptions from '@/components/PDFoptions.jsx';
import UploadPDFButton from '@/components/UploadPDFButton.jsx';
import { fetchPDFsReq } from '../../../utils/apis.js';

export default function DashboardPage() {
  const { user,pdfs,setPdfs } = useAuth();
 
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getPDFs = async () => {
        try {
          const res = await fetchPDFsReq();
          console.log("response in getPDFs is", res);
          const pdfArray = Array.isArray(res) ? res : [];
          console.log("pdfArray is", pdfArray);
         setPdfs(pdfArray);
          console.log("pdfArray in dashboard page is", pdfArray);
          console.log("pdfs in dashboard page is - UseEffect 1", pdfs);
        } catch (err) {
          console.error('Failed to fetch PDFs:', err);
        }
      };
    getPDFs();
  }, []);

  useEffect(() => {
    console.log("pdfs in dashboard page is -Useeffec 2", pdfs);
    let result = [...pdfs];

    if (search) {
      result = result.filter((pdf) =>
        pdf.fileName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dateFilter) {
      result = result.filter((pdf) =>
        pdf.createdAt.startsWith(dateFilter)
      );
    }

    setFiltered(result);
  }, [search, dateFilter, pdfs]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color:'primary.main'}}>
        Documents
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          mb: 3,
        }}
      >
       <UploadPDFButton />
        <TextField
          label="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Filter by date"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Uploaded On</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((pdf) => (
              <TableRow
                key={pdf._id}
                hover 
              >
                <TableCell 
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(`/pdf/${pdf._id}`)}
                >
                    {pdf.fileName}
                </TableCell>
                <TableCell>
                  {new Date(pdf.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                    <PDFoptions pdf={pdf} />
                </TableCell>
              </TableRow>
              
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No PDFs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
