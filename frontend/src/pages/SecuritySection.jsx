import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';

const SecuritySection = () => (
    <>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button variant="contained" color="warning">Upgrade to Premium</Button>
        </Grid>

        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="h6">Password</Typography>
                            <Button size="small">Create</Button>
                        </Box>
                        <Typography color="text.secondary">Create a password to secure your account access.</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="h6">Two Factor Authentication</Typography>
                            <Button size="small">Enable</Button>
                        </Box>
                        <Typography color="text.secondary" mb={1}>Improve your security using 2FA with your password and a QR code.</Typography>
                        <Typography>Status: <strong>disabled</strong></Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>
);

export default SecuritySection;
