import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './propertyDetail.css'; // Import the CSS file

const PropertyList = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await axios.get(`https://real-estate-management-server-mern.onrender.com/api/properties/`);
            setProperties(res.data);
            console.log(res.data);
        } catch (err) {
            setError('Error fetching properties.');
        } finally {
            setLoading(false);
        }
    };

    const deleteProperty = async (propertyId) => {
        try {
            await axios.delete(`https://real-estate-management-server-mern.onrender.com/api/properties/${propertyId}`);
            // alert("Successfully deleted");
            setProperties(properties.filter(property => property._id !== propertyId));
        } catch (err) {
            setError('Error deleting property.');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-danger">{error}</div>;
    if (properties.length === 0) return <div className="text-center">No properties available.</div>;

    return (
        <div className="container">
            <h1>Property List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id}>
                            <td>{property.title}</td>
                            <td>{property.description}</td>
                            <td>${property.price}</td>
                            <td>{property.location}</td>
                            <td>{property.type}</td>
                            <td>{property.status}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteProperty(property._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => navigate(`/properties/${property._id}/edit`)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyList;
