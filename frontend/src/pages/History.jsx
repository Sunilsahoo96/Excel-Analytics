import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, CircularProgress, Box, Grid, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Snackbar, Alert
} from '@mui/material';

const MyUploads = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchMyFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/excel/history', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to fetch files');

      setFiles(data.files);
    } catch (err) {
      console.error('Error fetching user files:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/excel/history', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete history');

      setFiles([]);
      setOpenConfirm(false);
      setSnackbar({ open: true, message: 'Upload history cleared successfully.', severity: 'success' });
    } catch (err) {
      console.error('Error deleting history:', err.message);
      setSnackbar({ open: true, message: 'Failed to delete upload history.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchMyFiles();
  }, []);

  return (
    <Box p={4} maxWidth='90vw'>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <Typography variant="h4" gutterBottom>
          My Uploaded Excel Files
        </Typography>
        {files.length > 0 && (
          <Button sx={{ marginLeft: '400px' }} variant="outlined" color="error" onClick={() => setOpenConfirm(true)}>
            Delete All History
          </Button>
        )}
      </Box>

      {loading ? (
        <CircularProgress />
      ) : files.length === 0 ? (
        <Typography>No files uploaded yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {files.map((file) => {
            const uploadedDate = new Date(file.uploadedAt);
            const formattedDate = uploadedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            const formattedTime = uploadedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            return (
              <Grid item xs={12} sm={6} md={4} key={file._id}>
                <Card variant="outlined" sx={{
                  borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.1s ease',
                  '&:hover': {
                    transform: 'scale(1.06)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}>
                  <CardContent>
                    <Typography fontWeight="bold" color='#2F4F4F'>File Name: {file.originalname}</Typography>
                    <Typography color='#2F4F4F' mt={2}>Date: {formattedDate}</Typography>
                    <Typography color='#2F4F4F'>Time: {formattedTime}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete All History?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete your upload history? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDeleteHistory} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyUploads;
