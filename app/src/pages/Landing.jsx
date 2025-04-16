import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Landing() {

  const push = useNavigate();
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{  bgcolor: 'primary.main', display: 'flex', flexDirection: 'column', 
                  alignItems: 'center', justifyContent: 'center', padding: '28px', 
                  width: '900px', height: '200px', borderRadius: '12px' }}
      >
        <Typography variant="h1" component="h1" sx={{ color: 'white'}}>Zaman-News</Typography>
        <Typography variant="h4" component="h3" >A Historical News Time Machine</Typography>
        <Typography variant="p" component="h4" sx={{ color: 'white'}}>Get news articles from the past on any date and from any country</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '50px' }}>
        <Typography variant="h6" component="h4">Sign Up to get started</Typography>
        { user ? 
          <Button variant="contained" onClick={() => { push('/home') }}>Home</Button> 
          :
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', padding: '30px' }}>
            <Button variant="contained" onClick={() => { push('/signup') }}>Sign Up</Button>
            <Button variant="outlined" color="secondary" onClick={() => { push('/login') }}>Login</Button>
          </Box>
        }
      </Box>
    </Box>
    
  )
}

export default Landing;