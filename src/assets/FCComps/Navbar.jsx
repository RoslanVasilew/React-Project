import React from 'react';
import '/src/assets/CSS/Navbar.css'; // Ensure the CSS path is correct

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
                <li><a href="/" onClick={handleDisconnect}>Disconnect</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
