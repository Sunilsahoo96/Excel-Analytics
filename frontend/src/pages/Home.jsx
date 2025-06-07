import React, { useState } from 'react';
import "../Styles/Home.css"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Close as CloseIcon } from '@mui/icons-material';


const Home = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleUploadClick = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
    } else {
      console.log("User is logged in, proceed with upload");
      // In a real application, you would navigate to the upload page here
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/');
  };

  return (
    <div className='home'>
      {/* Transparent Header with Border */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          boxShadow: 'none',
          padding: '10px 20px',
          borderBottom: '0.5px solid rgb(209, 198, 198)', 
        }}
        style={{ background:'radial-gradient(circle at center,rgb(63, 181, 79),rgb(36, 133, 42))' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Excel Converter
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/login" sx={{ mr: 2 }}>Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg,rgb(0, 0, 0), #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Effortless <br />
          Excel Conversion
        </Typography>

        <Typography variant="h6" sx={{ color: 'rgba(79, 77, 77, 0.59)', mb: 4 }}>
          Convert your Excel files quickly and easily to various formats.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#329f40',
            padding: '12px 36px',
            fontWeight: 'bold',
            fontSize: '16px',
            borderRadius: '30px',
            '&:hover': {
              backgroundColor: '#329f80',
            },
          }}
          onClick={handleUploadClick}
        >
          Upload Excel File
        </Button>
      </Container>

      {/* Dialog Box */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#bcf9c4',
            color: '#ffffff',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.35)',
          },
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            color: '#aaa',
          }}
          onClick={handleDialogClose}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle
          sx={{ textAlign: 'center', color: '#454845', fontWeight: 'bold' }}
        >
          Access Denied
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#454845' }}>
            You have not logged in. Please log in to upload your file.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={() => navigate('/login')}
            variant="contained"
            sx={{
              backgroundColor: '#329f80',
              '&:hover': { backgroundColor: '#329f40' },
            }}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
      <footer>
        <Box sx={{ textAlign: 'center', py: 1, borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0d0a2c' }}>
          <Typography variant="body2" sx={{ color: '#aaa' }}>© 2025 Excel Converter. Built with ❤️ by Sunil.</Typography>
        </Box>
      </footer>
    </div>
  );
};

export default Home;