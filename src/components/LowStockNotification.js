
import React from 'react';
//import './component/LowStockNotification.css';

const LowStockNotification = ({ stock }) => {
  const lowStockItems = stock.filter(item => item.quantity <= 5);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="low-stock-notification">
      <h3>Low Stock Alert</h3>
      <ul>
        {lowStockItems.map(item => (
          <li key={item.id}>
            <span className="stock-name">{item.name}</span>
            <span className="stock-quantity">Qty: {item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStockNotification;