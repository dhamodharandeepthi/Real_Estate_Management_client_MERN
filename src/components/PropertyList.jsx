import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce'; // Ensure lodash is installed for debounce functionality
import './propertyList.css'; // Import custom CSS

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [searchParams, setSearchParams] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        type: '',
        status: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { location, minPrice, maxPrice, type, status } = searchParams;

    useEffect(() => {
        fetchProperties();
    }, [searchParams]);

    const fetchProperties = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`https://real-estate-management-server-mern.onrender.com/api/properties/`, { params: searchParams });
            setProperties(res.data);
        } catch (err) {
            setError('Error fetching properties. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = debounce(() => {
        fetchProperties();
    }, 300); // Adjust delay as needed

    const onChange = e => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
        debouncedSearch();  // Call debounced search function
    };

    return (
        <div className="property-list-container">
            <h1 className="my-4 text-center">Search Properties (Give two details)</h1>
            <form onSubmit={e => e.preventDefault()} className="search-form mb-4">
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <input type="text" name="location" value={location} onChange={onChange} className="form-control" placeholder="Location" />
                    </div>
                    <div className="form-group col-md-2">
                        <input type="number" name="minPrice" value={minPrice} onChange={onChange} className="form-control" placeholder="Min Price" />
                    </div>
                    <div className="form-group col-md-2">
                        <input type="number" name="maxPrice" value={maxPrice} onChange={onChange} className="form-control" placeholder="Max Price" />
                    </div>
                    <div className="form-group col-md-2">
                        <select name="type" value={type} onChange={onChange} className="form-control">
                            <option value="">All Types</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <select name="status" value={status} onChange={onChange} className="form-control">
                            <option value="">All Statuses</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                </div>
            </form>
            {loading && <p className="text-center text-info">Loading properties...</p>}
            {error && <p className="text-center text-danger">{error}</p>}
            <table className="table table-striped property-table">
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
                    {properties.length > 0 ? (
                        properties.map(property => (
                            <tr key={property._id}>
                                <td>{property.title}</td>
                                <td>{property.description}</td>
                                <td>${property.price}</td>
                                <td>{property.location}</td>
                                <td>{property.type}</td>
                                <td>{property.status}</td>
                                <td>
                                    <Link to={`/properties/${property._id}`}>
                                        <button className="btn btn-primary btn-sm">View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No properties found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyList;
