import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
} from '@mui/material';
import CountUp from 'react-countup';
import axios from 'axios';

// Icons
import GroupIcon from '@mui/icons-material/Group';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';

const StatCard = ({ icon, label, value }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        height: 160,
        width: 260,
        padding: 2,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: '#1976d2' }}>{icon}</Avatar>
          <Typography variant="subtitle1" fontWeight={500}>
            {label}
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight={600} mt={2}>
          <CountUp end={value} duration={2} />
        </Typography>
      </CardContent>
    </Card>
  );
};

function AdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDownloads: 0,
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchStats = async () => {
      try {
        const [usersRes, downloadsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/stats/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/admin/stats/downloads', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats({
          totalUsers: usersRes.data.totalUsers,
          totalDownloads: downloadsRes.data.totalDownloads,
        });
      } catch (err) {
        console.error('Error fetching stats:', err.message);
      }
    };

    const fetchFiles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/excel/all-history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch files');
        setFiles(data.files);
      } catch (err) {
        console.error('Error fetching files:', err.message);
      }
    };

    fetchStats();
    fetchFiles();
  }, []);

  return (
   <>
   <h2>Dashboard</h2>
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          icon={<GroupIcon />}
          label="Total Users"
          value={stats.totalUsers}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          icon={<UploadFileIcon />}
          label="Excel Files Uploaded"
          value={files.length}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          icon={<DownloadIcon />}
          label="Files Downloaded"
          value={stats.totalDownloads}
        />
      </Grid>
    </Grid>
   </>
  );
}

export default AdminStats;
