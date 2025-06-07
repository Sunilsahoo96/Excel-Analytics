import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';


const TeamSection = () => (
    <>
        <Typography variant="h5" gutterBottom>Workspace</Typography>
        <Card>
            <CardContent sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', padding: 4 , maxWidth:'600px'}}>
                <Box sx={{ flex: 1 }}>
                    <img src ="../workspace.svg" alt="workspace" style={{ width: '100%' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        Create and manage teams in your workspace
                    </Typography>
                    <Typography variant="body1" color="text.secondary">✓ Manage licenses & users</Typography>
                    <Typography variant="body1" color="text.secondary">✓ Organize by teams</Typography>
                    <Typography variant="body1" color="text.secondary">✓ Set roles & permissions</Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 3 }}>Invite members</Button>
                </Box>
            </CardContent>
        </Card>
    </>
);

export default TeamSection;
