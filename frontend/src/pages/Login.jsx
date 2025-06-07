import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearMessages } from '../redux/authSlice';
import "../Styles/body.css";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const { user, loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      const timer = setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin-panel'); 
        } else {
          navigate('/dashboard-layout');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleClose = () => {
    dispatch(clearMessages());
  };

  const labelFocusColor = '#2F4F4F';

  const inputStyle = {
    '& .MuiInputBase-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 2,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: '#2F4F4F',
    },
    '& .MuiInputLabel-root': {
      color: '#2F4F4F',
      fontSize: '1.1rem',
      fontWeight: 600,
      '&.Mui-focused': {
        color: labelFocusColor,
      },
      '&.MuiFormLabel-filled': {
        color: labelFocusColor,
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    input: {
      color: '#2F4F4F',
    },
  };

  return (
    <Container maxWidth="xs" sx={{ background: 'transparent', mt: 18 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 3, color: '#3f3f3f' }}
        >
          Login to Your Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={inputStyle}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              sx={inputStyle}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                fontWeight: 'bold',
                py: 1.2,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#2F4F4F',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#2F4F4F' }} /> : 'Login'}
            </Button>
          </Box>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: '#ccc' }}
        >
          New User?{' '}
          <Link to="/register" style={{ color: '#2F4F4F', fontWeight: 500 }}>
            Register here
          </Link>
        </Typography>

        <Typography variant="body2" align="right" sx={{ mt: 3, color: '#ccc' }}>
          <Button
            variant="text"
            onClick={() => navigate('/')}
            sx={{
              mt: 1,
              fontSize: '0.875rem',
              color: '#2F4F4F',
              textTransform: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            ← Back
          </Button>
        </Typography>
      </Paper>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: '100%', backgroundColor: '#ffebee', color: '#b71c1c' }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%', backgroundColor: '#e8f5e9', color: '#2e7d32' }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
