import React, { useEffect, useState } from 'react';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';
import StockCheck from './StockCheck';
import DispenseMedicine from './DispenceMedicine'; // Corrected spelling from Dispence to Dispense
import axios from 'axios';
import './PharmacistDashboard.css'

const PharmacistDashboard = () => {
    const [inventory, setInventory] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [activeTab, setActiveTab] = useState('inventory'); // State to manage active tab

    useEffect(() => {
        fetchInventory(); // Fetch inventory on component load
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:8085/ht/Pharmacist/inventory');
            setInventory(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    const addItem = async (item) => {
        try {
            const response = await axios.post('http://localhost:8085/ht/Pharmacist/inventory', item);
            setInventory([...inventory, response.data]); // Add the new item to the inventory list
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const updateItem = async (id, item) => {
        try {
            await axios.put(`http://localhost:8085/ht/Pharmacist/inventory/${id}`, item);
            setInventory(inventory.map(i => (i.id === id ? { ...i, ...item } : i))); // Update the inventory list
            setCurrentItem(null); // Reset current item after update
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/ht/Pharmacist/inventory/${id}`);
            setInventory(inventory.filter(item => item.id !== id)); // Remove the deleted item from the inventory list
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setActiveTab('inventory'); // Switch back to inventory tab when editing
    };

    return (
        <div>
            <h1>Pharmacist Dashboard</h1>
            <div className="tab-container">
                <button 
                    className={activeTab === 'Inventory' ? 'active' : ''} 
                    onClick={() => setActiveTab('Inventory')}
                >
                    Inventory
                </button>
                <button 
                    className={activeTab === 'Inventory List' ? 'active' : ''} 
                    onClick={() => setActiveTab('Inventory List')}
                >
                    Inventory List
                </button>
                <button 
                    className={activeTab === 'Stock' ? 'active' : ''} 
                    onClick={() => setActiveTab('Stock')}
                >
                    Check Stock
                </button>
                <button 
                    className={activeTab === 'Dispense' ? 'active' : ''} 
                    onClick={() => setActiveTab('Dispense')}
                >
                    Dispense Medicine
                </button>

            </div>

            {activeTab === 'Inventory' && (
                <InventoryForm addItem={addItem} updateItem={updateItem} currentItem={currentItem} />  
            )}

            {activeTab === 'Inventory List' && (
                <InventoryList inventory={inventory} onDelete={deleteItem} refreshInventory={fetchInventory} />
            )}

            {activeTab === 'Stock' && (
                <StockCheck inventory={inventory} />
            )}

            {activeTab === 'Dispense' && (
                <DispenseMedicine inventory={inventory} updateItem={updateItem} />
            )}
        </div>
    );
};

export default PharmacistDashboard;