import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PatientDetails from './components/Patient';
import PatientPortal from './components/PatientPortal';
import Signup from './components/Signup';
import PharmacistDashboard from './components/PharmacistDashboard';
import ReceptionDashboard from './components/Receptionist';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import StockCheck from './components/StockCheck';
import DispenceMedicine from './components/DispenceMedicine';
import BillManagement from './components/BillManagement';
import NewInvoice from './components/NewInvoice';
import TotalInvoices from './components/TotalInvoice';
import InvoiceBill from './components/InvoiceBill';
import UpdateInvoice from './components/UpdateBill';
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
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:8085/ht/Pharmacist/inventory');
            setInventory(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error.response?.data || error.message);
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
            console.error("Error adding item:", error.response?.data || error.message);
        }
    };

    const updateItem = async (id, item) => {
        try {
            await axios.put(`http://localhost:8085/ht/Pharmacist/inventory/${id}`, item);
            fetchInventory();
            setCurrentItem(null);
        } catch (error) {
            console.error("Error updating item:", error.response?.data || error.message);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/ht/Pharmacist/inventory/${id}`);
            fetchInventory();
        } catch (error) {
            console.error("Error deleting item:", error.response?.data || error.message);
        }
    };

    const handleDispense = async (itemId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:8085/ht/Pharmacist/inventory/${itemId}/dispence`,
                null,
                {
                    params: { quantity },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                alert('Item dispensed successfully!');
                refreshInventory();
            } else {
                alert('Failed to dispense item. Please try again.');
            }
        } catch (error) {
            console.error("Error dispensing item:", error.response?.data || error.message);
            alert(error.response?.data?.message || 'Error dispensing item.');
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
                    <Route path="/user-dashboard" element={<PatientPortal />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/patients/:id" element={<PatientDetails />} />
                    <Route path="/patient-portal" element={<PatientPortal />} />
                    <Route path="/pharmacy" element={<PharmacistDashboard />} />
                    <Route path="/recep" element={<ReceptionDashboard />} />
                    <Route path="/inventory" element={<InventoryForm addItem={addItem} updateItem={updateItem} currentItem={currentItem} />} />
                    <Route path="/inventory/list" element={<InventoryList inventory={inventory} onEdit={setCurrentItem} onDelete={deleteItem} refreshInventory={refreshInventory} />} />
                    <Route path="/inventory/stock" element={<StockCheck inventory={inventory} />} />
                    <Route path="/inventory/dispence" element={<DispenceMedicine inventory={inventory} handleDispense={handleDispense} refreshInventory={refreshInventory} />} />
                    <Route path="/bill-management" element={<BillManagement refreshInventory={refreshInventory} />} />
                    <Route path="/new-invoice" element={<NewInvoice inventory={inventory}  refreshInventory={refreshInventory} />} />
                    <Route path="/total-invoices" element={<TotalInvoices />} />
                    <Route path="/invoice-bill" element={<InvoiceBill />} />
                    <Route path="/update-bill" element={<UpdateInvoice />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
