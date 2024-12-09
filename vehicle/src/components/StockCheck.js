import React from 'react';
import './StockCheck.css';

const StockCheck = ({ inventory }) => {
    const inStockItems = inventory.filter(item => item.stock > 0);

    return (
        <div>
            <h2>Items in Stock</h2>
            <ul>
                {inStockItems.length > 0 ? (
                    inStockItems.map(item => (
                        <li key={item.id}>
                           Name : {item.name}   Price: ${item.price.toFixed(2)}  Stock: {item.stock}
                        </li>
                    ))
                ) : (
                    <p>No items in stock.</p>
                )}
            </ul>
        </div>
    );
};

export default StockCheck;
