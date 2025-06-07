import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  Divider
} from "@mui/material";

import "../Styles/AdminPanel.css";
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from "react";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { BarChart, Dashboard, ExitToApp, RemoveShoppingCartOutlined } from "@mui/icons-material";

function AdminPanel() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    window.location.href = '/';
    setIsLogoutDialogOpen(false);
  };

  const handleCloseLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  return (
    <div className='adminPanel'>
      <div className='sidebar'>
        <div className='items'>
          <h3>Admin Panel</h3>
          <ListItemButton onClick={() => navigate('/admin-panel')}
            sx={{
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              }
            }}>
            <ListItemIcon> <Dashboard/></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('total-user')}
            sx={{
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              }
            }}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Total Users" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate('total-file')}
            sx={{
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              }
            }}>
            <ListItemIcon><LockOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Total Files" />
          </ListItemButton>

         
        </div>

        <div className="second">
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />
           <ListItemButton onClick={handleLogoutClick}
            sx={{
              backgroundColor:'',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              }
            }}>
            <ListItemIcon><ExitToApp/></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
          <Dialog
            open={isLogoutDialogOpen}
            onClose={handleCloseLogoutDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to logout?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
              <Button onClick={handleConfirmLogout} autoFocus>
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      <div className='mainContent'>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
