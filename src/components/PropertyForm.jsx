import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './propertyForm.css'; // Import custom CSS

const PropertyForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        type: '',
        status: 'available'
    });

    const { title, description, price, location, type, status } = formData;

    useEffect(() => {
        if (id) {
            fetchProperty();
        }
    }, [id]);

    const fetchProperty = async () => {
        const res = await axios.get(`https://real-estate-management-server-mern.onrender.com/api/properties/${id}`);
        setFormData(res.data);
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (id) {
            await axios.put(`https://real-estate-management-server-mern.onrender.com/api/properties/${id}`, formData);
            alert("Successfully updated");
        } else {
            await axios.post(`https://real-estate-management-server-mern.onrender.com/api/properties`, formData);
            alert("property added successfully")
        }
        navigate('/properties');
    };

    return (
        <div className="property-form-container">
            <div className="property-form-card">
                <form onSubmit={onSubmit}>
                    <h1 className="mb-4 text-center">{id ? 'Edit Property' : 'Add Property'}</h1>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" value={title} onChange={onChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={description} onChange={onChange} className="form-control" required></textarea>
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" name="price" value={price} onChange={onChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" value={location} onChange={onChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select name="type" value={type} onChange={onChange} className="form-control" required>
                            <option value="">select</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={status} onChange={onChange} className="form-control">
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">{id ? 'Update' : 'Add'}</button>
                </form>
            </div>
        </div>
    );
};

export default PropertyForm;
