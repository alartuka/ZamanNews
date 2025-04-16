import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Box, Button, Link, TextField, Typography } from '@mui/material';


function Signup() {
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");
    const [success, setSuccess] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // sign up user
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess("Sign-up successful");
            nav("/home");
            console.log("Sign-up successful");
            
        } catch (error) {
            const errCode = error.code;
            const errMessage = error.message;
            setError(errMessage);
            console.log(errCode, errMessage);
        }
        setLoading(false);
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: '500px',
                margin: 'auto',
                padding: '50px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: 'white',
            }}
        >
            <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center' }}>
                Sign Up
            </Typography>

            <TextField
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />

            <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                sx={{ mt: 2 }}
            />
            
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                {loading ? 'Signing up...' : 'Sign up'}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
                {   err && 
                    <Typography variant="body2" color="error">
                        {err}
                    </Typography>
                }

                {   success && 
                    <Typography variant="body2" color="success">
                        {success}
                    </Typography>
                }

                <Box mt={1}>
                    Already have an account? {" "}
                    <Link href="/login" variant="body2">
                        Sign in
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Signup;