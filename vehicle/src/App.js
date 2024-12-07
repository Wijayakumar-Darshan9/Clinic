import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PatientDetails from './components/Patient';
import { default as PatientPortal, default as UserDashboard } from './components/PatientPortal';
import Signup from './components/Signup';
import PharmacistDashboard from './components/PharmacistDashboard';
import ReceptionDashboard from './components/Receptionist';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import StockCheck from './components/StockCheck';
import DispenceMedicine from './components/DispenceMedicine'; // Correct component name
import axios from 'axios';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        fetchInventory(); // Fetch inventory on app load
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:8085/ht/Pharmacist/inventory');
            setInventory(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    const refreshInventory = async () => {
        await fetchInventory();
    };

    const addItem = async (item) => {
        try {
            await axios.post('http://localhost:8085/ht/Pharmacist/inventory', item);
            fetchInventory();
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const updateItem = async (id, item) => {
        try {
            await axios.put(`http://localhost:8085/ht/Pharmacist/inventory/${id}`, item);
            fetchInventory();
            setCurrentItem(null);
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/ht/Pharmacist/inventory/${id}`);
            fetchInventory();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    // Define handleDispense function
    const handleDispense = async (itemId, quantity) => {
        const API_URL = 'http://localhost:8085/ht/Pharmacist/inventory'; // Ensure this matches your backend URL
        try {
            const token = localStorage.getItem('token'); // Adjust based on your authentication method
            const response = await axios.put(`${API_URL}/${itemId}/dispence`, null, {
                params: { quantity },
                headers: {
                    'Authorization': `Bearer ${token}` // Include the authorization token
                }
            });

            if (response.status === 200) {
                alert('Successfully dispensed the item!'); // Success message
                await refreshInventory(); // Refresh the inventory list
            } else {
                alert('Failed to dispense item. Please check the details and try again.');
            }
        } catch (error) {
            console.error("Error dispensing item:", error.response ? error.response.data : error);
            alert(error.response?.data?.message || 'Error dispensing item. Please check the quantity or item status.');
        }
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <div className="content">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/patients/:id" element={<PatientDetails />} />
                    <Route path="/patient-portal" element={<PatientPortal />} />
                    <Route path="/pharmacy" element={<PharmacistDashboard />} />
                    <Route path="/recep" element={<ReceptionDashboard />} />
                    <Route path="/inventory" element={<InventoryForm addItem={addItem} updateItem={updateItem} currentItem={currentItem} />} />
                    <Route path="/inventory/list" element={<InventoryList inventory={inventory} onEdit={setCurrentItem} onDelete={deleteItem} refreshInventory={refreshInventory} />} />
                    <Route path="/inventory/stock" element={<StockCheck inventory={inventory} />} />
                    <Route path="/inventory/dispence" element={<DispenceMedicine inventory={inventory} handleDispense={handleDispense} refreshInventory={refreshInventory} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;