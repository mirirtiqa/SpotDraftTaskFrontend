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

export default function DashboardPage() {
  const { user,pdfs,fetchPDFs,setPdfs } = useAuth();
 
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchPDFs();
  }, []);

  useEffect(() => {
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
      <Typography variant="h4" gutterBottom>
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
