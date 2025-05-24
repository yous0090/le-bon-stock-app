import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import Login from './components/Login';
import Header from './components/Header';
import StockList from './components/StockList';
import AddStockForm from './components/AddStockForm';
import CalendarComponent from './components/CalendarComponent';
import LowStockNotification from './components/LowStockNotification';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Initialize stock from localStorage or empty array
  const [stock, setStock] = useState(() => {
    const saved = localStorage.getItem('stockData');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Save stock to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem('stockData', JSON.stringify(stock));
  }, [stock]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const addStockItem = (newItem) => {
    setStock(prev => [...prev, newItem]);
  };

  const removeStock = (id) => {
    if (user?.role === 'admin') {
      setStock(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateQuantity = (id, newQuantity) => {
    setStock(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const csvHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Category', key: 'category' },
    { label: 'Supplier', key: 'supplier' },
    { label: 'Brakes URL', key: 'brakesUrl' },
    { label: 'Urban URL', key: 'urbanUrl' },
  ];

  const lowStockItems = stock.filter(item => item.quantity <= 5);

  return (
    <div className="app-wrapper">
      <Header
        user={user}
        onLogout={() => setUser(null)}
        currentDateTime={currentDateTime}
        stock={stock}
      />
      <div className="main-content">
        <div className="stock-list">
          <StockList
            stock={stock}
            isAdmin={user.role === 'admin'}
            onUpdate={updateQuantity}
            onRemove={removeStock}
          />
          {/* Admin-only export buttons */}
          {user.role === 'admin' && stock.length > 0 && (
            <div className="export-buttons">
              <CSVLink
                data={stock}
                headers={csvHeaders}
                filename="full_stock_export.csv"
                className="export-btn-main"
              >
                Export All Stock
              </CSVLink>
              {lowStockItems.length > 0 && (
                <CSVLink
                  data={lowStockItems}
                  headers={[
                    { label: 'Name', key: 'name' },
                    { label: 'Quantity', key: 'quantity' },
                  ]}
                  filename="low_stock_export.csv"
                  className="export-btn-main"
                >
                  Export Low Stock Only
                </CSVLink>
              )}
            </div>
          )}
        </div>
        {user.role === 'admin' && (
          <>
            <div className="add-stock-form">
              <AddStockForm onAddStock={addStockItem} />
            </div>
            <div className="low-stock-section">
              <LowStockNotification stock={stock} threshold={5} />
            </div>
          </>
        )}
        <div className="calendar-container">
          <CalendarComponent currentDateTime={currentDateTime} />
        </div>
      </div>
    </div>
  );
}

export default App;