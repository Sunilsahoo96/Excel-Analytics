// DashboardLayout.jsx
import React from 'react';
import DashboardAppBar from './UserDashboard';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

function DashboardLayout() {
  return (
    <Box>
      <DashboardAppBar />
      <div style={{marginTop:"70px"}}>
        <Outlet />
      </div>
    </Box>
  );
}

export default DashboardLayout;
