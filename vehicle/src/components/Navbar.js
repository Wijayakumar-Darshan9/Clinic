import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <>
            <header className="header">
                <button className="hamburger" onClick={toggleSidebar}>
                    ☰
                </button>
                <h2>Patient Portal</h2>
            </header>
            <nav className={`navbar ${sidebarVisible ? 'visible' : 'hidden'}`}>
                <ul className="navbar-list">
                    {!isAuthenticated && <li><Link to="/home">Home</Link></li>}
                    {isAuthenticated ? (
                        
                        <li><button className='log-button'  onClick={handleLogout}>Logout</button></li>
                        
                    ) : (
                        <>
                            <li><Link to="/signup">Signup</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
