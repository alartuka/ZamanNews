import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, MenuItem, InputLabel, Select, Typography, Grid2 } from '@mui/material';
import Navbar from '../components/Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NewsFeed from './NewsFeed';


function Home() {
  const countries = require('../countries.json');
  const push = useNavigate();

  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [articles, setArticles] = useState([]);
  const [reset, setReset] = useState(true);

  // Check if user is signed in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) { // user is NOT signed in
        console.log("user is not signed in!");
        push("/login");
      }
    })
  }, []);

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      country: country,
      date: startDate.toISOString().split('T')[0]
    };

    console.log(data);

    fetch('http://localhost:5000/articles', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    })

    .then(data => (
      console.log("Response data:", data),
      setArticles(data),
      setReset(false)
    ))

    .catch(error => console.log(error));
  };

  const handleReset = () => {
    setReset(true);
    setArticles([]);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Navbar />
      {reset &&
        // ========== NEWS ENQUIRY FORM ========== 
        <Box
          component="form"
          sx={{
            width: '30%',
            maxWidth: '900px',
            marginTop: '50px',
            // margin: 'auto',
            padding: '50px',
            borderRadius: '8px',
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
          <Grid2 container spacing={4} display={'flex'} flexDirection={'column'}>
            <Grid2 item>
              <Typography variant="h5" component="div" sx={{ color: 'primary.main', mb: 1, textAlign: 'center' }}>Zaman-News</Typography>
              <Typography variant="body1" component="div" sx={{ mb: 1, textAlign: 'center' }}>A Historical News Time Machine</Typography>
            </Grid2>

            <Grid2 item>
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                fullWidth
                required
                labelId="country-select-label"
                id="country-select"            
                label="Country"
                value={country}
                onChange={handleCountry}
              >
                {countries.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid2>
            
            <Grid2 item>
              <InputLabel id="date-select-label">Date</InputLabel>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </Grid2>
            
            <Button variant="outlined" type="submit" onClick={handleSubmit} sx={{ borderRadius: '16px', mt: 3, mb: 2 }}>
              Search
            </Button>
          
          </Grid2>
        </Box>
      }
        
      {articles && !reset &&
        // ========== NEWS FEED ==========
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <NewsFeed articles={articles} /> 
          <Button variant="contained" onClick={handleReset}>Reset Search</Button> 
        </Box>        
      }


    </Box>
  )
}

export default Home