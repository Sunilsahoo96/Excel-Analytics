import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  
import excelReducer from './excelSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    excel: excelReducer 
  },
});

export default store;
