import React, { useState, useEffect } from 'react';
import './InventoryForm.css';

const InventoryForm = ({ addItem, updateItem, currentItem }) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [NewPrice, getPrice] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSaved, setIsSaved] = useState(false); // New state to track if item is saved

    useEffect(() => {
        if (currentItem) {
            setName(currentItem.name);
            setCode(currentItem.code);
            getPrice(currentItem.NewPrice)
            setPrice(currentItem.price);
            setStock(currentItem.stock);
            setIsSaved(false); // Reset saved state when editing an item
        } else {
            setName('');
            setCode('');
            getPrice('');
            setPrice('');
            setStock('');
            setIsSaved(false);
        }
    }, [currentItem]);

    const handleNameChange = (e) => {
        const value = e.target.value;
        // Only allow alphabetic characters and spaces
        if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
            setName(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const item = { 
            name, 
            code: parseInt(code), 
            getPrice: parseFloat(NewPrice),
            price: parseFloat(price), 
            stock: parseInt(stock) 
        };

        try {
            let response;
            if (currentItem) {
                response = await fetch(`http://localhost:8085/ht/Pharmacist/items/${currentItem.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item),
                });
            } else {
                response = await fetch('http://localhost:8085/ht/Pharmacist/inventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item),
                });
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (currentItem) {
                updateItem(data.id, item);
            } else {
                addItem(data);
            }
            setSuccess('Item successfully saved!');
            setError('');
            setIsSaved(true); // Set saved state to true

            // Show success alert
            alert('Success: Item saved successfully!'); // Popup message for success
        } catch (error) {
            setError('Failed to save item. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div>
            {!isSaved ? ( // Show form only if item is not saved
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="getPrice"
                        value={NewPrice}
                        onChange={(e) => getPrice(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                    <button type="submit">{currentItem ? 'Update Item' : 'Add Item'}</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </form>
            ) : (
                // Display saved item details in a table format
                <div>
                    <h2>Item Saved!</h2>
                    <p style={{ color: 'green' }}>{success}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Code</th>
                                <th>NewPrice</th>
                                <th>Price</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{name}</td>
                                <td>{code}</td>
                                <td>{NewPrice}</td>
                                <td>{price}</td>
                                <td>{stock}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InventoryForm;