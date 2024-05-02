import React, { useEffect, useState } from 'react';
import '/src/assets/CSS/Navbar.css'; // Ensure the CSS path is correct
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const email = localStorage.getItem('email');  // Get 'email' from local storage
    const nav=useNavigate();

    const handleDisconnect = (e) => {
        localStorage.clear(); // Clear local storage
        nav('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/src/images/logo.png" alt="Logo" />
            </div>
            <ul className="navbar-menu">
                {email?<li style={{color:"black", cursor:"pointer"}} onClick={handleDisconnect}>Disconnect</li>:""}
                
            </ul>
        </nav>
    );
}

export default Navbar;
