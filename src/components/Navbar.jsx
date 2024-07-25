import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './navbar.css'; 


const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <img src="/logo.png" alt="Real Estate" style={{ width: '60px', marginRight: '20px' }} />
                Real Estate Management
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/properties">Properties</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/properties/new">Add Property</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-danger" onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
