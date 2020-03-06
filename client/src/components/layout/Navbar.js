import React from 'react';

const Navbar = () => {
    return (
        <nav className = "navbar bg-dark">
            <h1>
                <a herf = "index.html"><i className = "fas fa-code"></i></a>
            </h1>
            <ul>
                <li><a herf = "profiles.html">Developers</a></li>
                <li><a herf = "register.html">Register</a></li>
                <li><a herf = "login.html">Login</a></li>
            </ul>
        </nav>
    )
};

export default Navbar; 