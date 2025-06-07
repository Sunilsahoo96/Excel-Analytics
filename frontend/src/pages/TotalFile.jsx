import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';

function TotalFile() {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/excel/all-history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log(data)
        setFiles(data.files || []);
      } catch (err) {
        console.error('Failed to fetch file history:', err.message);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>All Uploaded Files</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Filename</b></TableCell>
              <TableCell><b>Uploaded Date</b></TableCell>
              <TableCell><b>Uploaded Time</b></TableCell>
              <TableCell><b>User Name</b></TableCell>
              <TableCell><b>User Email</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, index) => {
              const date = new Date(file.uploadedAt);
              const formattedDate = date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              });
              const formattedTime = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              });

              return (
                <TableRow key={index}>
                  <TableCell>{file.originalname}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{formattedTime}</TableCell>
                  <TableCell>{file.user?.name || 'N/A'}</TableCell>
                  <TableCell>{file.user?.email || 'N/A'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TotalFile;
