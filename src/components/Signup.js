import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import './style.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        nic:'',
        dateOfBirth:''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted"); 

        
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("All fields are required");
            console.log("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            console.log("Passwords do not match");
            return;
        }
        const formattedData = {
            ...formData,
            dateOfBirth: moment(formData.dateOfBirth).format('DD.MM.YYYY')
        };

        try {
            const response = await axios.post('http://localhost:8085/ht/signup', formattedData);
            console.log(response.data);
            toast.success("Signup successful!");
            navigate('/login');
        } catch (error) {
            toast.error("Email already exists");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="nic" placeholder="NIC" value={formData.NIC} onChange={handleChange} required />
                <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <button type="submit">Signup</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;
