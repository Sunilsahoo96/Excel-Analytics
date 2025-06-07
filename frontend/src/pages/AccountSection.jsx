import React from 'react';
import {
    Box, Card, CardContent, Typography, Grid, Button, IconButton, Link
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useSelector } from 'react-redux';

const AccountSection = () => {
    const { user } = useSelector((state) => state.auth);
    const username = user?.name || '';
    const email = user?.email || '';

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, marginTop:'20px' }}>
                <Button variant="contained" color="warning">Upgrade to Premium</Button>
            </Box>

            <Card sx={{ mb: 3 }} style={{width:'60%'}}>
                <CardContent>
                    <Typography variant="h6" mb={2}>Profile</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="text.secondary">First name:</Typography>
                            <Typography>{username}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="text.secondary">Last name:</Typography>
                            <Typography>-</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="text.secondary">Country:</Typography>
                            <Typography>🇮🇳 India</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="text.secondary">Timezone:</Typography>
                            <Typography>UTC</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="#" underline="hover">Business details</Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="#" underline="hover">Plans & Packages</Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ mb: 3 }} style={{width:'60%'}}>
                <CardContent>
                    <Typography variant="h6" mb={2}>Social Links</Typography>
                    <Typography color="text.secondary"><GoogleIcon sx={{ mr: 1 }} /> {email}</Typography>
                    <Box mt={2}>
                        <IconButton color="primary"><FacebookIcon /></IconButton>
                        <IconButton color="error"><GoogleIcon /></IconButton>
                    </Box>
                </CardContent>
            </Card>

            <Card style={{width:'60%'}}>
                <CardContent>
                    <Typography variant="h6" mb={2}>Email</Typography>
                    <Typography color="text.secondary">{email}</Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default AccountSection;
