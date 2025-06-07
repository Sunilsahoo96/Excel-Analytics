import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person'; // Import PersonIcon



function DashboardAppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setIsUserMenuOpen(true);
  };

  const handleCloseUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false);
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
    <AppBar position="fixed" style={{background:'radial-gradient(circle at center,rgb(63, 181, 79),rgb(36, 133, 42))', color: '#fff', padding:'15px', marginBottom:'20px'}}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}> {/* Use space-between */}
        <Typography variant="h6" component="div">
          Excel Analytics
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          {!isMobile && (
            <>
              
              <Button color="inherit" onClick={()=>navigate('/dashboard-layout')} startIcon={<CloudUploadIcon />} sx={{ mr: 1 }}>
                Upload Excel
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
            </>
          )}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenMenu}
            sx={{ ml: !isMobile ? 1 : 0 }} 
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* User Menu (Desktop) */}
      {!isMobile && (
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isUserMenuOpen}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={()=>navigate("/account")}>My Account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      )}

      {/* Hamburger Menu (Desktop and Mobile) */}
      <Menu
        anchorEl={anchorElMenu}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" onClick={()=>navigate("/dashboard-layout")}/>
        </MenuItem>
        
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Solutions" />
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Pricing" />
        </MenuItem>
        {isMobile && (
          <MenuItem onClick={()=>navigate('/account')}> {/* "My Account" in mobile menu */}
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </MenuItem>
        )}
        {isMobile && (
          <>
           
            <MenuItem onClick={()=>navigate('/dashboard-layout')}>
              <ListItemIcon>
                <CloudUploadIcon />
              </ListItemIcon>
              <ListItemText primary="Upload Excel" />
            </MenuItem>
            <Divider />
          </>
        )}
        <Divider />
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary="Language" />
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </MenuItem>
        {isMobile && (
          <MenuItem onClick={handleLogoutClick}> {/* "Logout" in mobile menu */}
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        )}
      </Menu>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={isLogoutDialogOpen}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
          <Button onClick={handleConfirmLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default DashboardAppBar;