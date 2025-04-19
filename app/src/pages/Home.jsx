"use client";

// import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
// import { useEffect } from 'react';
// import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, MenuItem, InputLabel, Select, Typography, Grid2, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import NewsFeed from './NewsFeed';
import { useAuth } from '../AuthContext';


function Home() {
  const countries = require('../countries.json');
  const { push } = useNavigate();
  const { user } = useAuth();

  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [articles, setArticles] = useState([]);
  const [reset, setReset] = useState(true);
  const [loading, setLoading] = useState(false);

  // Check if user is signed in
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) { // user is NOT signed in
  //       console.log("user is not signed in!");
  //       push("/login");
  //     }
  //   })
  // }, []);

  // =========== COUNTRY ===========
  const handleCountry = (event) => {
    setCountry(event.target.value);
    country.toLowerCase();
  };

  // =========== DATE ===========
  const handleDate = (date) => {
    setStartDate(date);
  };

  // =========== SEARCH ===========
  const handleSubmit = (event) => {
    event.preventDefault();
    
    setReset(false);
    setLoading(true);

    // Send request to backend
    console.log("input date:", startDate);

    const data = {
      country: country,
      date: startDate.toISOString().split('T')[0]
    };

    console.log(data);

    fetch('/articles', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
      }
      return response.json(); 
    })
    .then(data => {
      console.log("DATA:", data);

      setArticles(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
      alert("Error fetching data. Please check your internet connection or contact the server administrator.");
    });
  }

  // ========== RESET ==========
  const handleReset = () => {
    setReset(true);
    setLoading(false);
    setArticles([]);
    setCountry('');
    setStartDate(new Date());
  };
  
  // ========== LOADING PAGE ==========
  if (loading) {
    return (
      <Box sx={{ top: 50, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress size={200} />
        <Typography variant="h4" sx={{ marginTop: '20px', color: 'primary.main', textAlign: 'center' }}>
          Loading historical headlines...
        </Typography>

        <Typography variant="body1" sx={{ marginTop: '10px', textAlign: 'center', color: 'gray' }}>
          Buckle up! We're taking you back in time.
        </Typography>
      </Box>
    );
  } 

  // ========== HOME PAGE ==========
  if (user) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Navbar />

        {reset ? ( 
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
              {/* ========== HEADER ========== */}
              <Grid2>
                <Typography variant="h5" component="div" sx={{ color: 'primary.main', mb: 1, textAlign: 'center' }}>Zaman-News</Typography>
                <Typography variant="body1" component="div" sx={{ mb: 1, textAlign: 'center' }}>A Historical News Time Machine</Typography>
              </Grid2>

              {/* ========== COUNTRY FIELD ========== */}
              <Grid2>

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
              
              {/* ========== DATE FIELD ========== */}
              <Grid2 item>
                <InputLabel id="date-select-label">Date</InputLabel>
                <DatePicker selected={startDate} onChange={handleDate} />
              </Grid2>
              
              {/* ========== SUBMIT BUTTON ========== */}
              <Button variant="outlined" type="submit" onClick={handleSubmit} sx={{ borderRadius: '16px', mt: 3, mb: 2 }}>
                Search
              </Button>
            </Grid2>
          </Box>
        
        ) : (articles && articles.length > 0) ? (
          // ========== NEWS FEED ==========
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>Country: {country} | Date: {startDate.toDateString()}</Typography>
            <Button variant="contained" onClick={handleReset} sx={{ borderRadius: '16px', mt: 4, mb: 4 }}>Reset</Button> 
            <NewsFeed articles={articles} /> 
          </Box>  

        ) : ( 
          // ========== NO NEWS FOUND ==========
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h5" component="div" sx={{ color: 'primary.main', mb: 1, textAlign: 'center' }}>Sorry, no news articles from {country} found on {startDate.toDateString()}. Please try agian.</Typography>
            <Button variant="contained" onClick={handleReset} sx={{ borderRadius: '16px', mt: 4, mb: 4 }}>Reset</Button>
          </Box>
        )} 
      </Box>
    )
  } else {
    // ========== USER NOT LOGGED IN ==========
    push('/login');
  }
}

export default Home;