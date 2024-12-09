import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './DispenceMedicine.css'


const DispenseMedicine = ({ inventory, refreshInventory }) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [dispenseQuantity, setDispenseQuantity] = useState(0);
    const API_URL = 'http://localhost:8085/ht/Pharmacist/inventory'; // Ensure this matches your backend URL
    const navigate = useNavigate(); // Initialize useNavigate

    const handleDispense = async (e) => {
        e.preventDefault();
        if (selectedItem && dispenseQuantity > 0) {
            try {
                const token = localStorage.getItem('token'); // Adjust based on your authentication method
                const response = await axios.put(`${API_URL}/${selectedItem}/dispence`, null, { // Corrected spelling from "dispense" to "dispense"
                    params: { quantity: dispenseQuantity },
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the authorization token
                    }
                });

                if (response.status === 200) {
                    alert('Successfully dispensed the item!'); // Success message
                    setDispenseQuantity(0); // Reset dispense quantity
                    setSelectedItem(''); // Reset selected item
                    await refreshInventory(); // Refresh the inventory list

                    // Navigate to InventoryForm page after dispensing
                    navigate('/inventory'); // Change to the appropriate route for InventoryForm
                }
            } catch (error) {
                console.error("Error dispensing item:", error.response ? error.response.data : error);
                // Suppressed error alert
            }
        } else {
            alert("Please select an item and enter a valid quantity.");
        }
    };

    return (
        <div>
            <h1>Dispense Medicine</h1>
            <form onSubmit={handleDispense}>
                <label>
                    Select Item:
                    <select
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select an item</option>
                        {inventory.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name} (Available: {item.stock}) {/* Assuming 'stock' is the available quantity */}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Quantity to Dispense:
                    <input
                        type="number"
                        min="1"
                        value={dispenseQuantity}
                        onChange={(e) => setDispenseQuantity(Number(e.target.value))}
                        required
                    />
                </label>
                <br />
                <button type="submit">Dispense</button>
            </form>
        </div>
    );
};

export default DispenseMedicine;