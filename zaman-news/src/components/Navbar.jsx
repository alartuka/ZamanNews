import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        console.log(error)
        });
    }

  return (
    <div>
        <button onClick={handleLogout}>
            Logout
        </button>
    </div>
  );
}

export default Navbar;