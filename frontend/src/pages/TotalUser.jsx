import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function TotalUser() {
  const [users, setUsers] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState('');
  const token = localStorage.getItem('token');



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/stats/all-users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error('Failed to fetch users:', err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleViewFiles = async (userId, userName) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Backend response:", res.data);
      setSelectedFiles(res.data.files);
      setSelectedUserName(userName);

    } catch (err) {
      console.error('Failed to fetch user files:', err.message);
    }
  };


  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err.message);
    }
  };

  const [excelData, setExcelData] = useState([]);

  const handleViewExcel = async (fileId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/excel/file/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExcelData(res.data.parsedData); // Display this below the table
    } catch (err) {
      console.error('Failed to fetch Excel data:', err.message);
    }
  };


  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>Total Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewFiles(user._id, user.name)}>
                    <VisibilityIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedFiles.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <Typography variant="h6">{selectedUserName}'s Uploaded Files</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Filename</b></TableCell>
                  <TableCell><b>Upload Date</b></TableCell>
                  <TableCell><b>Upload Time</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedFiles.map((file, index) => {
                  const uploadedDate = new Date(file.uploadedAt);
                  const formattedDate = uploadedDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  });
                  const formattedTime = uploadedDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  });

                  return (
                    <TableRow key={index}>
                      <TableCell>{file.originalname}</TableCell>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>{formattedTime}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleViewExcel(file._id)}>
                          <VisibilityIcon color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {excelData.length > 0 && (
            <div style={{ marginTop: 30 }}>
              <Typography variant="h6">Excel File Data</Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {Object.keys(excelData[0]).map((key, idx) => (
                        <TableCell key={idx}><b>{key}</b></TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {excelData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Object.values(row).map((value, cellIndex) => (
                          <TableCell key={cellIndex}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TotalUser;
