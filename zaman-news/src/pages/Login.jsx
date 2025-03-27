import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Box, Button, Link, TextField, Typography } from '@mui/material';

function Login() {
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setSuccess("Log-in successful");
            nav("/home");
            console.log(user);
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.log(errorCode, errorMessage);
        })
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
                Log in
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
                {loading ? 'Logging in...' : 'Login'}
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

                {/* <Link href="" variant="body2">
                Forgot Password?
                </Link> */}

                <Box mt={1}>
                    Don't have an account? {" "}
                    <Link href="/signup" variant="body2">
                        Sign Up
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;