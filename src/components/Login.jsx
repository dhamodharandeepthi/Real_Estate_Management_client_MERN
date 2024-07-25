import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './login.css'; // Import the custom CSS

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login(email, password);
            // alert("Login successful")
            navigate('/properties/add');  // Redirect to the PropertyForm page
        } catch (err) {
            // alert("Please enter valid email or password")
            console.error(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <form onSubmit={onSubmit}>
                    <h1 className="mb-4 text-center">Login</h1>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
