// MyAccountPage.jsx
import DashboardAppBar from './UserDashboard';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import React from 'react';
import {
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Typography,

    Avatar,
    Divider,
    Box,

} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';

function MyAccountPage() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const username = user?.name || '';

    return (
        <div>
            <DashboardAppBar />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 10fr', gap: '40px', marginTop: '98px' }} >
                {/* Sidebar */}
                <Grid item xs={12} md={3} sx={{
                    height: '87vh', overflowY: 'auto', pr: 1, scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    backgroundColor: '#5ab767',
                    padding: '20px',
                    borderTopRightRadius: '25px',
                    borderBottomRightRadius: '25px',
                    color: 'white'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                            <AccountCircleIcon   sx={{
                                fontSize:'40px'
                            }} />
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="bold">Registered</Typography>
                        <Typography variant="body2" color="#112868" fontSize={20} mb={2}><b>{username}</b></Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List component="nav" >
                        <ListItemButton onClick={() => navigate('/account')}
                            sx={{
                                color: 'white',
                                '& .MuiListItemIcon-root': {
                                    color: 'White',
                                }
                            }}>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="My account"/>
                        </ListItemButton>
                        <ListItemButton onClick={() => navigate('security')}  sx={{
                                color: 'white',
                                '& .MuiListItemIcon-root': {
                                    color: 'White',
                                }
                            }}>
                            <ListItemIcon><LockOutlinedIcon /></ListItemIcon>
                            <ListItemText primary="Security" />
                        </ListItemButton>
                        <ListItemButton onClick={() => navigate('team')}  sx={{
                                color: 'white',
                                '& .MuiListItemIcon-root': {
                                    color: 'White',
                                }
                            }}>
                            <ListItemIcon><PeopleOutlineIcon /></ListItemIcon>
                            <ListItemText primary="Team" />
                        </ListItemButton>


                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" ml={1}>Activity</Typography>
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItemButton onClick={() => navigate('history')}  sx={{
                                color: 'white',
                                '& .MuiListItemIcon-root': {
                                    color: 'White',
                                    pl:3
                                }
                            }}>
                                <ListItemIcon><TaskAltOutlinedIcon /></ListItemIcon>
                                <ListItemText primary="History" />
                            </ListItemButton>
                        </List>
                        <Divider sx={{ my: 2 }} />
                        {/* <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" ml={1}>Signatures</Typography>
                        <List component="nav">
                            <ListItem button sx={{ pl: 3 }}>
                                <ListItemIcon><LayersOutlinedIcon /></ListItemIcon>
                                <ListItemText primary="Overview" />
                            </ListItem>
                            <ListItem button sx={{ pl: 3 }}>
                                <ListItemIcon><SendOutlinedIcon /></ListItemIcon>
                                <ListItemText primary="Sent" />
                            </ListItem>
                            <ListItem button sx={{ pl: 3 }}>
                                <ListItemIcon><InboxOutlinedIcon /></ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItem>
                            <ListItem button sx={{ pl: 3 }}>
                                <ListItemIcon><CheckCircleOutlineIcon /></ListItemIcon>
                                <ListItemText primary="Signed" />
                            </ListItem>
                            <ListItem button sx={{ pl: 3 }}>
                                <ListItemIcon><FolderOpenOutlinedIcon /></ListItemIcon>
                                <ListItemText primary="Templates" />
                            </ListItem>
                            <ListItem button sx={{ pl: 3 }}>
                                <ListItemIcon><ContactsOutlinedIcon /></ListItemIcon>
                                <ListItemText primary="Contacts" />
                            </ListItem>
                            <ListItem button sx={{ pl: 3 }}>
                                <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItem>
                        </List> */}

                        {/* <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" ml={1}>Billing</Typography>
                        <ListItem button sx={{ pl: 3 }}>
                            <ListItemIcon><ShoppingBagOutlinedIcon /></ListItemIcon>
                            <ListItemText primary="Plans & Packages" />
                        </ListItem>
                        <ListItem button sx={{ pl: 3 }}>
                            <ListItemIcon><ReceiptOutlinedIcon /></ListItemIcon>
                            <ListItemText primary="Business details" />
                        </ListItem> */}

                    </List>
                </Grid>

                {/* Main Content via Outlet */}
                <Grid item xs={12} md={9}>
                    <Outlet />
                </Grid>
            </div>
        </div>
    );
}

export default MyAccountPage;
