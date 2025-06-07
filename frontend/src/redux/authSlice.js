import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  success: null, // for showing snackbar success messages
};

// Login Thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, data);
      return res.data;
    } catch (err) {
      // ✅ Make sure the server sends .response.data.message
      const msg = err.response?.data?.message || 'Registration failed';
      return rejectWithValue(msg);
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = null;
      localStorage.clear();
    },
    clearMessages(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔐 Login reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = 'Login successful ';
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📝 Register reducers (no auto-login)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Registration successful ';
        // ✅ DO NOT set user/token or localStorage here
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('🔥 REJECTED ACTION:', action); // Debugging line
        state.loading = false;
        state.error = action.payload || 'Something went wrong!';
      });
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
