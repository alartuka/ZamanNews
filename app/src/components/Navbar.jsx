import React from 'react';
import { signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { AppBar, Avatar, Box, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';

function Navbar() {
    const push = useNavigate();
    const { user } = useAuth();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // user signed in
    //             const uid = user.uid;
    //             console.log("uid", uid);
    //         } else {
    //             // user signed out
    //             console.log("user is signed out");
    //             push("/login");
    //         }
    //     })
    //     }, []);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
 
    const handleSignOut = () => {               
        signOut(auth).then(() => {
        // Sign-out successful
            push("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // error occurred
        console.log(error)
        });
    }

    return (
        <Box sx={{ width: '100%', justifyItems: 'center' }}>
            <AppBar position="static" sx={{ borderRadius: '16px', padding: '2px', width: '50%'  }}>
                <Toolbar>
                    <Typography variant="h6" href="/" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" underline="none" color="inherit">
                            Zaman-News
                        </Link>
                    </Typography>

                    {user &&
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Profile">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user?.displayName} src={user?.photoURL} />
                                </IconButton>
                            </Tooltip>

                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{user.email}</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleSignOut}>
                                    <Typography sx={{ textAlign: 'center' }}>Sign out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;