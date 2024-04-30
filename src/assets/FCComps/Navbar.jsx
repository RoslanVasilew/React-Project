import React from 'react';
import '/src/Navbar.css'; // Ensure the CSS path is correct

const Navbar = () => {
    const email = localStorage.getItem('email');  // Get 'email' from local storage

    const handleDisconnect = (e) => {
        localStorage.clear(); // Clear local storage
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/src/images/logo.png" alt="Logo" />
            </div>
            <ul className="navbar-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                {email ? (
                    <li><a href="/" onClick={handleDisconnect}>Disconnect</a></li>
                ) : (
                    <li></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
